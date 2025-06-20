import {BoxGeometry, Group, Mesh, MeshPhysicalMaterial, TextureLoader} from "three";

const texture = new TextureLoader();

export default class Picture extends Group {
	constructor(src: string, width: number | string, height: number | string) {
		super();
		height = parseFloat(`${height}`) / 100;
		width = parseFloat(`${width}`) / 100;

		const attrs = {
			color: "#333333",
			roughness: 0.3,
			metalness: 0.1,
			reflectivity: 0.3,
		};
		const pictureMats = [
			new MeshPhysicalMaterial(attrs),
			new MeshPhysicalMaterial(attrs),
			new MeshPhysicalMaterial({...attrs, color: null, map: texture.load(src)}),
			new MeshPhysicalMaterial(attrs),
			new MeshPhysicalMaterial(attrs),
			new MeshPhysicalMaterial(attrs),
		];

		const d = (width + height) / 40;
		const pictureGeo = new BoxGeometry(width, d, height).translate(0, d / 2, 0);
		const pictureMesh = new Mesh(pictureGeo, pictureMats);
		pictureMesh.castShadow = true;
		pictureMesh.receiveShadow = true;
		this.add(pictureMesh);
	}
}
