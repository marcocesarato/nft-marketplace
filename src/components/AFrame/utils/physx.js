/* global AFRAME, THREE */

AFRAME.registerComponent("object-3d", {
	init() {
		this.el.addEventListener("model-loaded", this.rescale.bind(this));
	},
	update() {
		this.rescale();
	},
	rescale() {
		const el = this.el;
		const model = el.object3D;
		const box = new THREE.Box3().setFromObject(model);
		const size = box.getSize(new THREE.Vector3());
		const hole = document.createElement("a-plane");
		this.el.appendChild(hole);
		hole.setAttribute("position", `0 -0.2 0`);
		hole.setAttribute("rotation", `-90 2 0`);
		hole.setAttribute("width", size.x);
		hole.setAttribute("height", size.y);
		hole.setAttribute("class", "navmesh-hole");
		hole.setAttribute("visible", "false");
	},
	remove() {
		this.el.removeEventListener("model-loaded", this.rescale);
	},
});

AFRAME.registerComponent("physx-shape-from-model", {
	schema: {
		type: "string",
		default: "",
	},
	init() {
		const details = this.data;
		this.onLoad = function () {
			this.setAttribute("physx-shape", details);
			this.removeAttribute("physx-shape-from-model");
		};
		this.el.addEventListener("object3dset", this.onLoad);
	},
	remove() {
		this.el.removeEventListener("object3dset", this.onLoad);
	},
});

AFRAME.registerComponent("physx-body-from-model", {
	schema: {
		type: "string",
		default: "",
	},
	init() {
		const details = this.data;
		this.onLoad = function () {
			this.setAttribute("physx-body", details);
			this.removeAttribute("physx-body-from-model");
		};
		this.el.addEventListener("object3dset", this.onLoad);
	},
	remove() {
		this.el.removeEventListener("object3dset", this.onLoad);
	},
});

AFRAME.registerComponent("toggle-physics", {
	init() {
		this.onPickup = function () {
			this.el.setAttribute("physx-body", "type", "kinematic");
		}.bind(this);
		this.onPutDown = function (e) {
			this.el.setAttribute("physx-body", "type", "dynamic");
		}.bind(this);
		this.el.addEventListener("pickup", this.onPickup);
		this.el.addEventListener("putdown", this.onPutDown);
	},
	remove() {
		this.el.removeEventListener("pickup", this.onPickup);
		this.el.removeEventListener("putdown", this.onPutDown);
	},
});
