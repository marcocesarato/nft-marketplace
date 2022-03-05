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
import Picture from "./object/Picture";
import DepthDataTexture from "./texture/DepthDataTexture";
import XRManager from "./XRManager";

export default class XRController {
	isRunning = false;

	container = null;

	picture = null;
	pictureMaxWidth = 100;
	pictureMaxHeight = 100;
	picturePlacedEventName = "ar-picture-placed";
	pictureRemovedEventName = "ar-picture-removed";
	picturePlacedCallback = null;
	pictureRemovedCallback = null;

	scene = new Scene();
	pose = null;
	shadowMaterial = null;
	ambientLight = null;
	floorMesh = null;

	canvas = null;
	glContext = null;
	xrGlBinding = null;
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
		//this.scene.add(new AxesHelper(1));

		// Camera
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.resolution.set(window.innerWidth, window.innerHeight);

		// Reticle
		this.reticle = new Cursor();
		//this.reticle.add(new AxesHelper(0.5));
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
	}

	/**
	 * Creates a Scene containing lights that case shadows,
	 * and a mesh that will receive shadows.
	 *
	 * @return {Scene}
	 */
	createScene() {
		this.depthDataTexture = new DepthDataTexture();

		// The materials will render as a black mesh
		// without lights in our scenes. Let's add an ambient light
		// so our material can be visible, as well as a directional light
		// for the shadow.
		this.ambientLight = new AmbientLight(0x333333, 1);
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
	 * Create and setup webgl this.renderer object.
	 * @param {*} canvas
	 */
	createRenderer() {
		this.canvas = document.createElement("canvas");
		this.container.appendChild(this.canvas);

		this.glContext = this.canvas.getContext("webgl2", {xrCompatible: true});

		this.renderer = new WebGLRenderer({
			context: this.glContext,
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
			XRManager.start(
				this.renderer,
				{
					optionalFeatures: [
						"dom-overlay",
						"dom-overlay-for-handheld-ar",
						"light-estimation",
						"depth-sensing",
					],
					domOverlay: {root: this.container},
					requiredFeatures: ["hit-test"],
				},
				function (error) {
					console.error("Error starting the AR session. ", error);
				},
			);
			if (this.onToggleCallback) this.onToggleCallback(true);
		}
	}

	close() {
		if (this.isRunning && this.button) {
			XRManager.end();
			this.forceContextLoss();
			if (this.onToggleCallback) this.onToggleCallback(false);
		}
		document.removeEventListener(this.picturePlacedEventName, this.picturePlacedCallback);
		document.addEventListener(this.pictureRemovedEventName, this.pictureRemovedCallback);
	}

	getPictureSize(picture) {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.onload = () => resolve({height: img.height, width: img.width});
			img.onerror = reject;
			img.src = picture;
		});
	}

	scalePictureSize(width, height) {
		let ratio = 0;
		let scaledWidth = this.pictureMaxWidth;
		let scaledHeight = this.pictureMaxHeight;
		// Check if the current width is larger than the max
		if (width > this.pictureMaxWidth) {
			ratio = this.pictureMaxWidth / width;
			scaledHeight = height * ratio;
			height = height * ratio;
			width = width * ratio;
		}
		// Check if current height is larger than max
		if (height > this.pictureMaxHeight) {
			ratio = this.pictureMaxHeight / height;
			scaledWidth = width * ratio;
		}

		return {width: scaledWidth, height: scaledHeight};
	}

	async setPicture(src) {
		if (this.picture) this.removePicture();
		const {width, height} = await this.getPictureSize(src);
		const size = this.scalePictureSize(width, height);
		this.picture = new Picture(src, size.width, size.height, this.depthDataTexture);
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

		let ok = this.isReticle();
		if (ok) {
			this.picture.position.setFromMatrixPosition(this.reticle.matrix);
			this.picture.rotation.setFromRotationMatrix(this.reticle.matrix);

			this.scene.add(this.picture);
			this.reticle.visible = false;

			const picturePlace = new Event(this.picturePlacedEventName);
			document.dispatchEvent(picturePlace);
		}
		return ok;
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

	isReticle() {
		return this.reticle.visible;
	}

	render(timestamp, frame) {
		this.isRunning = !!frame;
		if (this.isRunning) {
			if (!this.isPicturePlaced()) {
				let referenceSpace = this.renderer.xr.getReferenceSpace();
				let session = this.renderer.xr.getSession();

				try {
					if (!this.xrGlBinding) {
						// eslint-disable-next-line no-undef
						this.xrGlBinding = new XRWebGLBinding(session, this.glContext);
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
						let directionalPosition = new Vector3(
							lightEstimate.primaryLightDirection.x,
							lightEstimate.primaryLightDirection.y,
							lightEstimate.primaryLightDirection.z,
						);
						directionalPosition.multiplyScalar(5);

						let intensity = Math.max(
							1.0,
							Math.max(
								lightEstimate.primaryLightIntensity.x,
								Math.max(
									lightEstimate.primaryLightIntensity.y,
									lightEstimate.primaryLightIntensity.z,
								),
							),
						);
						this.directionalLight.position.copy(directionalPosition);
						this.directionalLight.color.setRGB(
							lightEstimate.primaryLightIntensity.x / intensity,
							lightEstimate.primaryLightIntensity.y / intensity,
							lightEstimate.primaryLightIntensity.z / intensity,
						);
						this.directionalLight.intensity = intensity;

						this.lightProbe.sh.fromArray(lightEstimate.sphericalHarmonicsCoefficients);
					}
				}

				if (this.hitTestSource) {
					let hitTestResults = frame.getHitTestResults(this.hitTestSource);
					if (hitTestResults.length) {
						let hit = hitTestResults[0];
						this.reticle.visible = true;

						if (!this.firstReticleFound) {
							this.firstReticleFound = true;
							if (this.firstReticleCallback) this.firstReticleCallback();
						}

						this.reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);

						this.reticle.matrix.extractBasis(this.aX, this.aY, this.aZ);
						let alpha = Math.asin(this.aX.dot(this.yUp)); // assumes that both vec3 are normalized

						if (Math.abs(alpha) > 0.17) {
							let m = new Matrix4();
							m.makeRotationY(Math.PI + alpha);
							this.reticle.matrix.multiply(m);
						}

						// Update physics floor plane
						let position = new Vector3();
						position.setFromMatrixPosition(this.reticle.matrix);
						this.floorMesh.position.y = position.y;
					} else {
						this.reticle.visible = false;
					}
				}

				// Handle depth
				let viewerPose = frame.getViewerPose(referenceSpace);
				if (viewerPose) {
					this.pose = viewerPose;
					for (let view of this.pose.views) {
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

	isSupported(callback) {
		if (!navigator.xr || !navigator.xr.isSessionSupported) callback(false);
		navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
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
