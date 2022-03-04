import * as THREE from "three";
import {Matrix4, Vector3} from "three";
import {ARButton} from "three/examples/jsm/webxr/ARButton";

import Picture from "./elements/Picture";

/**
 * Creates a THREE.Scene containing lights that case shadows,
 * and a mesh that will receive shadows.
 *
 * @return {THREE.Scene}
 */
function createScene() {
	const scene = new THREE.Scene();

	// The materials will render as a black mesh
	// without lights in our scenes. Let's add an ambient light
	// so our material can be visible, as well as a directional light
	// for the shadow.
	const light = new THREE.AmbientLight(0xffffff, 1);
	const directionalLight = new THREE.DirectionalLight(0xffeecc, 0.5);
	directionalLight.position.set(10, 15, 10);

	// We want this light to cast shadow.
	directionalLight.castShadow = true;

	/*const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
	scene.add(helper);*/

	// Make a large plane to receive our shadows
	const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
	// Rotate our plane to be parallel to the floor
	planeGeometry.rotateX(-Math.PI / 2);

	// Create a mesh with a shadow material, resulting in a mesh
	// that only renders shadows once we flip the `receiveShadow` property.
	const shadowMesh = new THREE.Mesh(
		planeGeometry,
		new THREE.ShadowMaterial({
			color: 0x111111,
			opacity: 0.2,
		}),
	);

	// Give it a name so we can reference it later, and set `receiveShadow`
	// to true so that it can render our model's shadow.
	shadowMesh.name = "shadowMesh";
	shadowMesh.receiveShadow = true;
	shadowMesh.position.y = 10000;

	// Add lights and shadow material to scene.
	scene.add(shadowMesh);
	scene.add(light);
	scene.add(directionalLight);

	return scene;
}

export default function Controller(element) {
	let controller;
	let reticle;
	let picture;
	let isArRunning = false;
	let firstReticleFound = false;
	let firstReticleCallback;
	let XROnOffCallback;

	const renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true,
		autoClear: true,
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.xr.enabled = true;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setAnimationLoop(render);

	const arbutton = ARButton.createButton(renderer, {
		requiredFeatures: ["hit-test"],
		optionalFeatures: ["dom-overlay", "dom-overlay-for-handheld-ar"],
		domOverlay: {root: element},
	});

	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000,
	);

	const scene = createScene();
	//scene.add(new THREE.AxesHelper(1));

	reticle = new THREE.Mesh(
		new THREE.RingBufferGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
		new THREE.MeshBasicMaterial(),
	);
	// if false does not change position, rotation etc properties the matrix property automatically
	reticle.matrixAutoUpdate = false;
	reticle.visible = false;
	scene.add(reticle);
	//reticle.add(new THREE.AxesHelper(0.5));

	controller = renderer.xr.getController(0);
	controller.addEventListener("select", () => {
		// called on camera/screen tap
		placePicture();
	});
	scene.add(controller);

	function isInsideXR() {
		return isArRunning;
	}

	function openXR() {
		if (!isArRunning) {
			arbutton.click();
			if (XROnOffCallback) XROnOffCallback(true);
		}
	}

	function closeXR() {
		if (isArRunning && arbutton) {
			arbutton.click();
			if (XROnOffCallback) XROnOffCallback(false);
		}
	}

	function getPictureSize(picture) {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.onload = () => resolve({height: img.height, width: img.width});
			img.onerror = reject;
			img.src = picture;
		});
	}

	function calculateSize(width, height) {
		const maxWidth = 100; // Conventional max width for the image
		const maxHeight = 100; // Conventional max height for the image
		let ratio = 0;
		let scaledWidth = maxWidth;
		let scaledHeight = maxWidth;
		// Check if the current width is larger than the max
		if (width > maxWidth) {
			ratio = maxWidth / width;
			scaledWidth = maxWidth;
			scaledHeight = height * ratio;
			height = height * ratio;
			width = width * ratio;
		}
		// Check if current height is larger than max
		if (height > maxHeight) {
			ratio = maxHeight / height;
			scaledWidth = maxHeight;
			scaledWidth = width * ratio;
			width = width * ratio;
			height = height * ratio;
		}

		return {width: scaledWidth, height: scaledHeight};
	}

	async function setPicture(src) {
		if (picture) removePicture();
		const {width, height} = await getPictureSize(src);
		const size = calculateSize(width, height);
		picture = new Picture(src, size.width, size.height);
	}

	const setPicturePlaceCallback = (callback) => {
		document.addEventListener("ar-picture-place", callback);
	};

	const setPictureRemoveCallback = (callback) => {
		document.addEventListener("ar-picture-remove", callback);
	};

	function placePicture() {
		if (!isArRunning) return;

		let ok = isReticle();
		if (ok) {
			picture.position.setFromMatrixPosition(reticle.matrix);
			picture.rotation.setFromRotationMatrix(reticle.matrix);

			scene.add(picture);
			reticle.visible = false;

			const picturePlace = new Event("ar-picture-place");
			document.dispatchEvent(picturePlace);
		}
		return ok;
	}

	function removePicture() {
		scene.remove(picture);
		const pictureRemove = new Event("ar-picture-remove");
		document.dispatchEvent(pictureRemove);
	}

	function isPicturePlaced() {
		if (picture) {
			return picture.parent === scene;
		} else return false;
	}

	function isReticle() {
		return reticle.visible;
	}

	let aX = new Vector3();
	let aY = new Vector3();
	let aZ = new Vector3();
	let yUp = new Vector3(0, 1, 0);
	//let xUp = new Vector3(1, 0, 0);

	let hitTestSource = null;
	let hitTestSourceRequested = false;

	function render(timestamp, frame) {
		isArRunning = !!frame;

		if (isArRunning) {
			if (!isPicturePlaced()) {
				let referenceSpace = renderer.xr.getReferenceSpace();
				let session = renderer.xr.getSession();

				// init hittest on vr enter
				if (hitTestSourceRequested === false) {
					session.requestReferenceSpace("viewer").then(function (referenceSpace) {
						session
							.requestHitTestSource({space: referenceSpace})
							.then(function (source) {
								hitTestSource = source;
							});
					});
					session.addEventListener("end", function () {
						hitTestSourceRequested = false;
						hitTestSource = null;
					});
					hitTestSourceRequested = true;
				}

				if (hitTestSource) {
					let hitTestResults = frame.getHitTestResults(hitTestSource);
					if (hitTestResults.length) {
						let hit = hitTestResults[0];
						reticle.visible = true;

						if (!firstReticleFound) {
							firstReticleFound = true;
							if (firstReticleCallback) firstReticleCallback();
						}

						reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);

						reticle.matrix.extractBasis(aX, aY, aZ);
						let alpha = Math.asin(aX.dot(yUp)); // assumes that both vec3 are normalized

						if (Math.abs(alpha) > 0.17) {
							let m = new Matrix4();
							m.makeRotationY(Math.PI + alpha);
							reticle.matrix.multiply(m);
						}
					} else {
						reticle.visible = false;
					}
				}
			}
		}
		renderer.render(scene, camera);
	}

	return {
		openXR,
		closeXR,
		isInsideXR,
		isReticle,
		isPicturePlaced,
		setPicture,
		placePicture,
		removePicture,
		setOnFirstReticleCallback(c) {
			firstReticleCallback = c;
		},
		isArWorking(c) {
			if (!navigator.xr || !navigator.xr.isSessionSupported) c(false);
			navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
				c(!!supported);
			});
		},
		setOpenCloseCallback(c) {
			XROnOffCallback = c;
		},
		setPicturePlaceCallback,
		setPictureRemoveCallback,
	};
}
