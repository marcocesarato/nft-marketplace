import {Body, GSSolver, NaiveBroadphase, Plane, SplitSolver, Vec3, World} from "cannon-es";
import {
	AmbientLight,
	AmbientLightProbe,
	//AxesHelper,
	//CameraHelper,
	DirectionalLight,
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

import AugmentedMaterial from "./material/AugmentedMaterial";
import Cursor from "./object/Cursor";
import DepthDataTexture from "./texture/DepthDataTexture";
import LoaderUtils from "./utils/LoaderUtils";
import SessionUtils from "./utils/SessionUtils";

export default class XRController {
	isRunning = false;

	container = null;

	picture = null;
	pictureUrl = null;
	picturePlacedEventName = "ar-picture-placed";
	pictureRemovedEventName = "ar-picture-removed";
	picturePlacedCallback = null;
	pictureRemovedCallback = null;

	scene = new Scene();
	pose = null;
	shadowMaterial = null;
	ambientLight = null;
	floor = null;
	floorMesh = null;

	world = null;

	canvas = null;
	gl = null;
	glBinding = null;
	renderer = null;

	firstReticleFound = false;
	firstReticleCallback = null;

	onToggleCallback = null;

	hitTestSource = null;
	hitTestSourceRequested = false;

	lightProbe = null;
	xrLightProbe = null;

	depthDataTexture = null;

	aX = new Vector3();
	aY = new Vector3();
	aZ = new Vector3();
	yUp = new Vector3(0, 1, 0);
	xUp = new Vector3(1, 0, 0);

	resolution = new Vector2();
	camera = new PerspectiveCamera(60, 1, 0.1, 10);
	reticle = null;

	constructor(container) {
		this.container = container;
	}

	init() {
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

		// Renderer
		this.createRenderer();

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
	createScene() {
		this.depthDataTexture = new DepthDataTexture();

		this.ambientLight = new AmbientLight(0xffffff);
		this.scene.add(this.ambientLight);

		this.directionalLight = new DirectionalLight();
		this.directionalLight.castShadow = true;
		this.directionalLight.shadow.mapSize.set(1024, 1024);
		this.directionalLight.shadow.camera.far = 20;
		this.directionalLight.shadow.camera.near = 0.1;
		this.directionalLight.shadow.camera.left = -5;
		this.directionalLight.shadow.camera.right = 5;
		this.directionalLight.shadow.camera.bottom = -5;
		this.directionalLight.shadow.camera.top = 5;
		this.scene.add(this.directionalLight);

		//const helper = new CameraHelper(this.directionalLight.shadow.camera);
		//this.scene.add(helper);

		this.lightProbe = new AmbientLightProbe();
		this.scene.add(this.lightProbe);

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
	createWorld() {
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
	createRenderer() {
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
	resize() {
		this.resolution.set(window.innerWidth, window.innerHeight);

		this.camera.aspect = this.resolution.x / this.resolution.y;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(this.resolution.x, this.resolution.y);
		this.renderer.setPixelRatio(window.devicePixelRatio);
	}

	open() {
		if (!this.isRunning) {
			SessionUtils.start(
				this.renderer,
				{
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

	close() {
		if (this.isRunning && this.button) {
			SessionUtils.end();
			this.forceContextLoss();
			if (this.onToggleCallback) this.onToggleCallback(false);
		}
		document.removeEventListener(this.picturePlacedEventName, this.picturePlacedCallback);
		document.addEventListener(this.pictureRemovedEventName, this.pictureRemovedCallback);
	}

	async setPicture(src) {
		if (this.picture) this.removePicture();
		this.pictureUrl = src;
	}

	onPicturePlaced(callback) {
		if (this.picturePlacedCallback) {
			document.removeEventListener(this.picturePlacedEventName, this.picturePlacedCallback);
		}
		this.picturePlacedCallback = callback;
		document.addEventListener(this.picturePlacedEventName, this.picturePlacedCallback);
	}

	onPictureRemoved(callback) {
		if (this.pictureRemovedCallback) {
			document.removeEventListener(this.pictureRemovedEventName, this.pictureRemovedCallback);
		}
		this.pictureRemovedCallback = callback;
		document.addEventListener(this.pictureRemovedEventName, this.pictureRemovedCallback);
	}

	placePicture() {
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

	removePicture() {
		this.scene.remove(this.picture);
		const pictureRemove = new Event(this.pictureRemovedEventName);
		document.dispatchEvent(pictureRemove);
	}

	isPicturePlaced() {
		if (this.picture) {
			return this.picture.parent === this.scene;
		} else return false;
	}

	isReticleVisible() {
		return this.reticle.visible;
	}

	render(timestamp, frame) {
		this.isRunning = !!frame;
		if (this.isRunning) {
			const session = this.renderer.xr.getSession();

			if (!this.isPicturePlaced()) {
				const referenceSpace = this.renderer.xr.getReferenceSpace();

				try {
					if (this.gl && !this.glBinding) {
						// eslint-disable-next-line no-undef
						this.glBinding = new XRWebGLBinding(session, this.gl);
					}
				} catch (e) {
					console.error(e);
				}

				// init hittest on vr enter
				if (this.hitTestSourceRequested === false) {
					session.requestReferenceSpace("viewer").then((ref) => {
						session.requestHitTestSource({space: ref}).then((source) => {
							this.hitTestSource = source;
						});
					});
					session.addEventListener("end", () => {
						this.hitTestSourceRequested = false;
						this.hitTestSource = null;
					});
					session.requestLightProbe().then((probe) => {
						this.xrLightProbe = probe;
					});
					this.hitTestSourceRequested = true;
				}

				// Process lighting condition from probe
				if (this.xrLightProbe) {
					let lightEstimate;
					try {
						lightEstimate = frame.getLightEstimate(this.xrLightProbe);
					} catch (e) {}

					if (lightEstimate) {
						const directionalPosition = new Vector3(
							lightEstimate.primaryLightDirection.x,
							lightEstimate.primaryLightDirection.y,
							lightEstimate.primaryLightDirection.z,
						);
						directionalPosition.multiplyScalar(5);
						this.directionalLight.position.copy(directionalPosition);

						const intensity = Math.max(
							1.0,
							Math.max(
								lightEstimate.primaryLightIntensity.x,
								Math.max(
									lightEstimate.primaryLightIntensity.y,
									lightEstimate.primaryLightIntensity.z,
								),
							),
						);

						// Colors from 0 to 1
						const color = {
							red: lightEstimate.primaryLightIntensity.x / intensity,
							green: lightEstimate.primaryLightIntensity.y / intensity,
							blue: lightEstimate.primaryLightIntensity.z / intensity,
						};
						//this.ambientLight.color.setRGB(color.red, color.green, color.blue);
						this.directionalLight.color.setRGB(color.red, color.green, color.blue);
						this.directionalLight.intensity = intensity;

						this.lightProbe.sh.fromArray(lightEstimate.sphericalHarmonicsCoefficients);
					}
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

	onFirstReticle(c) {
		this.firstReticleCallback = c;
	}

	onToggle(c) {
		this.onToggleCallback = c;
	}

	checkIsSupported(callback) {
		if (!navigator.xr || !navigator.xr.isSessionSupported) callback(false);
		navigator.xr?.isSessionSupported("immersive-ar").then((supported) => {
			callback(!!supported);
		});
	}

	forceContextLoss() {
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
}
