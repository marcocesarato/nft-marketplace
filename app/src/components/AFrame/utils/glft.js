/* global AFRAME */

AFRAME.registerComponent("autocenter", {
	schema: {type: "number", default: 1},
	init: function () {
		this.scale();
		this.el.addEventListener("object3dset", () => this.scale());
	},
	scale: function () {
		/*const el = this.el;
		const span = this.data;
		const parent = el.parentElement;

		const mesh = el.getObject3D("mesh");

		if (!mesh) return;

		const parentPosition = parent.object3D.position;

		/*const span = this.data;
		const parentMesh = parent.getObject3D("mesh");

		console.log(this.el.parentElement.object3D);
		const scene = el.sceneEl;
		const bh = new THREE.BoxHelper(mesh, 0xffff00);
		scene.add(bh);

        const panel = document.querySelector(".room-model-panel");
		const bh2 = new THREE.BoxHelper(panel.object3D, 0xff0000);
		scene.add(bh2);*/
		/////////////////////////////
		/*// Compute bounds.
		const bbox = new THREE.Box3().setFromObject(mesh);

		// Normalize scale.
		const scale = span / bbox.getSize(new THREE.Vector3()).length();
		mesh.scale.set(scale, scale, scale);

		// Recenter.
		const offset = bbox.getCenter(new THREE.Vector3()).multiplyScalar(scale);
		mesh.position.sub(offset);*/
	},
});
