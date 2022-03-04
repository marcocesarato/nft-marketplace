import * as THREE from "three";

const texture = new THREE.TextureLoader();

export default class Picture extends THREE.Group {
	constructor(src, width, height) {
		super();
		height = parseFloat(height) / 100;
		width = parseFloat(width) / 100;

		const pictureMats = [
			new THREE.MeshBasicMaterial({color: "#333"}),
			new THREE.MeshBasicMaterial({color: "#333"}),
			new THREE.MeshBasicMaterial({map: texture.load(src)}),
			new THREE.MeshBasicMaterial({color: "#333"}),
			new THREE.MeshBasicMaterial({color: "#333"}),
			new THREE.MeshBasicMaterial({color: "#333"}),
		];

		const d = (width + height) / 40;
		const pictureGeo = new THREE.BoxBufferGeometry(width, d, height).translate(0, d / 2, 0);
		const pictureMesh = new THREE.Mesh(pictureGeo, pictureMats);
		pictureMesh.castShadow = true;
		pictureMesh.receiveShadow = true;
		this.add(pictureMesh);

		/*const shadowMat = new THREE.MeshBasicMaterial({
			color: "black",
			transparent: true,
			opacity: 0.2,
		});
		const shadowGeo = new THREE.PlaneBufferGeometry(width * 1.02, height * 1.02).rotateX(
			THREE.MathUtils.degToRad(-90),
		);
		const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
		this.add(shadowMesh);*/
	}
}
