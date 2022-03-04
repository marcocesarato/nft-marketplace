import {BoxBufferGeometry, Group, Mesh, MeshBasicMaterial, TextureLoader} from "three";

import AugmentedMaterial from "../material/AugmentedMaterial";

const texture = new TextureLoader();

export default class Picture extends Group {
	constructor(src, width, height, depthDataTexture) {
		super();
		height = parseFloat(height) / 100;
		width = parseFloat(width) / 100;

		const pictureMats = [
			new MeshBasicMaterial({color: "#333"}),
			new MeshBasicMaterial({color: "#333"}),
			new MeshBasicMaterial({map: texture.load(src)}),
			new MeshBasicMaterial({color: "#333"}),
			new MeshBasicMaterial({color: "#333"}),
			new MeshBasicMaterial({color: "#333"}),
		];

		const d = (width + height) / 40;
		const pictureGeo = new BoxBufferGeometry(width, d, height).translate(0, d / 2, 0);
		const pictureMesh = new Mesh(pictureGeo, pictureMats);
		pictureMesh.castShadow = true;
		pictureMesh.receiveShadow = true;
		pictureMesh.material = AugmentedMaterial.transform(pictureMesh.material, depthDataTexture);
		this.add(pictureMesh);
	}
}
