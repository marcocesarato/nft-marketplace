import {Body, GSSolver, NaiveBroadphase, Plane, SplitSolver, Vec3, World} from "cannon-es";
import {
	AmbientLight,
	Group,
	//AxesHelper,
	//CameraHelper,
	HemisphereLight,
	Matrix4,
	Mesh,
	PCFSoftShadowMap,
	PerspectiveCamera,
	PlaneBufferGeometry,
	Scene,
	ShadowMaterial,
	Vector2,
	Vector3,
	WebGLRenderer,
} from "three";
import {XREstimatedLight} from "three/examples/jsm/webxr/XREstimatedLight";

import AugmentedMaterial from "./material/AugmentedMaterial";
import Cursor from "./object/Cursor";
import Picture from "./object/Picture";
import DepthDataTexture from "./texture/DepthDataTexture";
import LoaderUtils from "./utils/LoaderUtils";
import SessionUtils from "./utils/SessionUtils";

export default class ARController {
	private isRunning: boolean = false;

	private container = null;

	private picture: Picture = null;
	private pictureUrl: string = null;
	private picturePlacedEventName: string = "ar-picture-placed";
	private pictureRemovedEventName: string = "ar-picture-removed";
	private picturePlacedCallback = null;
	private pictureRemovedCallback = null;

	private scene: Scene = new Scene();
	private pose = null;
	private shadowMaterial = null;
	private floor = null;
	private floorMesh = null;

	private world = null;

	private xr = (navigator as any)?.xr as XRSystem;
	private canvas = null;
	private gl = null;
	private renderer = null;
	private controller: Group = null;

	private firstReticleFound: boolean = false;
	private firstReticleCallback = null;

	private onToggleCallback = null;

	private hitTestSource = null;
	private hitTestSourceRequested = false;

	private ambientLight: AmbientLight = null;
	private xrLight: XREstimatedLight = null;

	private depthDataTexture: DepthDataTexture = null;

	private aX: Vector3 = new Vector3();
	private aY: Vector3 = new Vector3();
	private aZ: Vector3 = new Vector3();
	private yUp: Vector3 = new Vector3(0, 1, 0);
	private xUp: Vector3 = new Vector3(1, 0, 0);

	private resolution: Vector2 = new Vector2();
	private camera: PerspectiveCamera = new PerspectiveCamera(60, 1, 0.1, 10);
	private reticle: Cursor = null;

	constructor(container) {
		this.container = container;
	}

	public init() {
		// Renderer
		this.createRenderer();

		// Scene
		this.createScene();
		this.createWorld();

		// Camera
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.matrixAutoUpdate = false;

		// Resolution
		this.resolution.set(window.innerWidth, window.innerHeight);

		// Reticle
		this.reticle = new Cursor();
		this.scene.add(this.reticle);

		this.controller = this.renderer.xr.getController(0);
		this.controller.addEventListener("select", () => {
			// called on camera/screen tap
			this.placePicture();
		});
		this.scene.add(this.controller);

		// Render loop
		this.renderer.setAnimationLoop((time, frame) => {
			this.render(time, frame);
		});

		// Resize this.renderer
		window.addEventListener(
			"resize",
			() => {
				this.resize();
			},
			false,
		);

		// Helpers
		//this.scene.add(new AxesHelper(1));
		//this.reticle.add(new AxesHelper(0.5));
	}

	/**
	 * Creates a Scene containing lights that case shadows,
	 * and a mesh that will receive shadows.
	 *
	 * @return {Scene}
	 */
	private createScene() {
		this.depthDataTexture = new DepthDataTexture();

		// Ligths
		this.ambientLight = new AmbientLight(0xffffff);
		this.scene.add(this.ambientLight);

		const defaultLight = new HemisphereLight();
		defaultLight.position.set(0.5, 1, 0.25);
		this.scene.add(defaultLight);

		this.xrLight = new XREstimatedLight(this.renderer);
		this.xrLight.addEventListener("estimationstart", () => {
			// Swap the default light out for the estimated one one we start getting some estimated values.
			this.scene.add(this.xrLight);
			this.scene.remove(defaultLight);
			// The estimated lighting also provides an environment cubemap, which we can apply here.
			if (this.xrLight.environment) {
				this.scene.environment = this.xrLight.environment;
			}
		});

		this.xrLight.addEventListener("estimationend", () => {
			// Swap the lights back when we stop receiving estimated values.
			this.scene.add(defaultLight);
			this.scene.remove(this.xrLight);
			this.scene.environment = null;
		});

		this.scene.add(defaultLight);
		//this.scene.add(this.lightProbe);

		this.shadowMaterial = new ShadowMaterial({opacity: 0.5});
		this.shadowMaterial = AugmentedMaterial.transform(
			this.shadowMaterial,
			this.depthDataTexture,
		);

		this.floorMesh = new Mesh(new PlaneBufferGeometry(100, 100, 1, 1), this.shadowMaterial);
		this.floorMesh.rotation.set(-Math.PI / 2, 0, 0);
		this.floorMesh.castShadow = false;
		this.floorMesh.receiveShadow = true;
		this.scene.add(this.floorMesh);
	}

	/**
	 * Create physics this.world for collistion simulation.
	 */
	private createWorld() {
		this.world = new World();
		this.world.gravity.set(0, -9.8, 0);
		this.world.defaultContactMaterial.contactEquationStiffness = 1e9;
		this.world.defaultContactMaterial.contactEquationRelaxation = 4;
		this.world.quatNormalizeSkip = 0;
		this.world.quatNormalizeFast = false;

		this.world.broadphase = new NaiveBroadphase();
		this.world.broadphase.useBoundingBoxes = true;

		var solver = new GSSolver();
		solver.tolerance = 0.1;
		solver.iterations = 7;
		this.world.solver = new SplitSolver(solver);

		this.floor = new Body();
		this.floor.type = Body.STATIC;
		this.floor.position.set(0, 0, 0);
		this.floor.velocity.set(0, 0, 0);
		this.floor.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), -Math.PI / 2);
		this.floor.addShape(new Plane());
		this.world.addBody(this.floor);
	}

	/**
	 * Create and setup webgl this.renderer object.
	 * @param {*} canvas
	 */
	private createRenderer() {
		this.canvas = document.createElement("canvas");
		this.container.appendChild(this.canvas);

		this.gl = this.canvas.getContext("webgl2", {xrCompatible: true});

		this.renderer = new WebGLRenderer({
			context: this.gl,
			antialias: true,
			alpha: true,
			canvas: this.canvas,
			depth: true,
			powerPreference: "high-performance",
			precision: "highp",
			preserveDrawingBuffer: false,
			premultipliedAlpha: true,
			logarithmicDepthBuffer: false,
			stencil: true,
		});

		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = PCFSoftShadowMap;
		this.renderer.sortObjects = false;
		this.renderer.physicallyCorrectLights = true;

		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.xr.enabled = true;
	}

	/**
	 * Resize the canvas and this.renderer size.
	 */
	public resize() {
		this.resolution.set(window.innerWidth, window.innerHeight);

		this.camera.aspect = this.resolution.x / this.resolution.y;
		this.camera.updateProjectionMatrix();

		if (this.renderer !== null) {
			this.renderer.setSize(this.resolution.x, this.resolution.y);
			this.renderer.setPixelRatio(window.devicePixelRatio);
		}
	}

	public open() {
		if (!this.isRunning) {
			SessionUtils.start(
				this.renderer,
				{
					worldKnowledge: true,
					optionalFeatures: [
						"dom-overlay",
						"light-estimation",
						"depth-sensing",
						"local-floor",
						"bounded-floor",
						"hand-tracking",
						"layers",
					],
					domOverlay: {root: this.container},
					requiredFeatures: ["hit-test"],
				},
				(error) => {
					console.error("Error starting the AR session. ", error);
				},
			);
			if (this.onToggleCallback) this.onToggleCallback(true);
		}
	}

	public close() {
		if (this.isRunning) {
			SessionUtils.end();
			this.forceContextLoss();
			if (this.onToggleCallback) this.onToggleCallback(false);
		}
		document.removeEventListener(this.picturePlacedEventName, this.picturePlacedCallback);
		document.addEventListener(this.pictureRemovedEventName, this.pictureRemovedCallback);
	}

	private forceContextLoss() {
		try {
			if (this.renderer !== null) {
				this.renderer.dispose();
				this.renderer.forceContextLoss();
				this.renderer = null;
			}
		} catch (e) {
			this.renderer = null;
			throw new Error("Failed to destroy WebGL context.");
		}

		if (this.canvas !== null) {
			this.container.removeChild(this.canvas);
		}
	}

	public async setPicture(src) {
		if (this.picture) this.removePicture();
		this.pictureUrl = src;
	}

	public onPicturePlaced(callback) {
		if (this.picturePlacedCallback) {
			document.removeEventListener(this.picturePlacedEventName, this.picturePlacedCallback);
		}
		this.picturePlacedCallback = callback;
		document.addEventListener(this.picturePlacedEventName, this.picturePlacedCallback);
	}

	public onPictureRemoved(callback) {
		if (this.pictureRemovedCallback) {
			document.removeEventListener(this.pictureRemovedEventName, this.pictureRemovedCallback);
		}
		this.pictureRemovedCallback = callback;
		document.addEventListener(this.pictureRemovedEventName, this.pictureRemovedCallback);
	}

	private placePicture() {
		if (!this.isRunning) return;

		let visible = this.isReticleVisible();
		if (visible) {
			LoaderUtils.loadPicture(this, this.pictureUrl, 1, (picture) => {
				this.picture = picture;
				this.reticle.visible = false;
				const picturePlace = new Event(this.picturePlacedEventName);
				document.dispatchEvent(picturePlace);
			});
		}
		return visible;
	}

	public removePicture() {
		this.scene.remove(this.picture);
		const pictureRemove = new Event(this.pictureRemovedEventName);
		document.dispatchEvent(pictureRemove);
	}

	public isPicturePlaced() {
		if (this.picture) {
			return this.picture.parent === this.scene;
		} else return false;
	}

	public isReticleVisible() {
		return this.reticle.visible;
	}

	private render(timestamp, frame) {
		this.isRunning = !!frame;
		if (this.isRunning) {
			const session = this.renderer.xr.getSession();

			if (!this.isPicturePlaced()) {
				const referenceSpace = this.renderer.xr.getReferenceSpace();

				// init hittest on vr enter
				if (this.hitTestSourceRequested === false) {
					session.requestReferenceSpace("viewer").then((ref) => {
						const hitTestOptionsInit = {
							space: ref,
							entityTypes: ["plane", "point"],
						};
						session.requestHitTestSource(hitTestOptionsInit).then((source) => {
							this.hitTestSource = source;
						});
						session.updateWorldSensingState &&
							session
								.updateWorldSensingState({
									illuminationDetectionState: {
										enabled: true,
									},
									meshDetectionState: {
										enabled: true,
										normals: true,
									},
									planeDetectionState: {
										enabled: true,
									},
								})
								.catch((err) => console.error(err));
					});
					session.addEventListener("end", () => {
						this.hitTestSourceRequested = false;
						this.hitTestSource = null;
					});
					this.hitTestSourceRequested = true;
				}

				if (this.hitTestSource) {
					const hitTestResults = frame.getHitTestResults(this.hitTestSource);
					if (hitTestResults.length) {
						const hit = hitTestResults[0];
						this.reticle.visible = true;

						if (!this.firstReticleFound) {
							this.firstReticleFound = true;
							if (this.firstReticleCallback) this.firstReticleCallback();
						}

						this.reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);

						this.reticle.matrix.extractBasis(this.aX, this.aY, this.aZ);
						const alpha = Math.asin(this.aX.dot(this.yUp)); // assumes that both vec3 are normalized

						if (Math.abs(alpha) > 0.17) {
							const m = new Matrix4();
							m.makeRotationY(Math.PI + alpha);
							this.reticle.matrix.multiply(m);
						}

						// Update physics floor plane
						const position = new Vector3();
						position.setFromMatrixPosition(this.reticle.matrix);
						if (position.y < this.floor.position.y) {
							this.floor.position.y = position.y;
						}

						this.floorMesh.position.y = position.y;
					} else {
						this.reticle.visible = false;
					}
				}

				// Handle depth
				// Retrieve the pose of the device.
				// getViewerPose can return null while the session attempts to establish tracking.
				const viewerPose = frame.getViewerPose(referenceSpace);
				if (viewerPose) {
					this.pose = viewerPose;
					for (const view of this.pose.views) {
						let depthData;

						try {
							depthData = frame.getDepthInformation(view);
						} catch (e) {}

						if (depthData) {
							// Update textures
							this.depthDataTexture.updateDepth(depthData);

							// Update normal matrix
							AugmentedMaterial.updateUniforms(
								this.scene,
								depthData.normTextureFromNormView.matrix,
							);
						}
					}
				}
			}
		}
		this.renderer.render(this.scene, this.camera);
	}

	public onFirstReticle(c) {
		this.firstReticleCallback = c;
	}

	public onToggle(c) {
		this.onToggleCallback = c;
	}

	public checkIsSupported(callback) {
		if (!this.xr || !this.xr?.isSessionSupported) callback(false);
		this.xr?.isSessionSupported("immersive-ar").then((supported) => {
			callback(!!supported);
		});
	}
}
