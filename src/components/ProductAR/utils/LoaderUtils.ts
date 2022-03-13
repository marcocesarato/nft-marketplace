import {Body} from "cannon-es";
import {Mesh, Vector3} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {ShapeType, threeToCannon} from "three-to-cannon";

import AugmentedMaterial from "../material/AugmentedMaterial";
import Picture from "../object/Picture";
import ObjectUtils from "./ObjectUtils";

/**
 * Loader utils contain auxiliary methods to load objects into scene.
 */
export default class LoaderUtils {
	static pictureMaxWidth = 100;
	static pictureMaxHeight = 100;

	/**
	 * Load Object3D and place in scene.
	 */
	static loadObject(
		{scene = null, world = null, reticle = null, depthDataTexture = null},
		object,
		scale = 1,
		onLoaded = (payload) => {},
	) {
		const position = new Vector3();
		if (reticle?.matrix) {
			position.setFromMatrixPosition(reticle.matrix);
			object.rotation.setFromRotationMatrix(reticle.matrix);
		}

		object.traverse((child) => {
			if (child instanceof Mesh) {
				child.castShadow = true;
				child.receiveShadow = true;
				child.material = AugmentedMaterial.transform(child.material, depthDataTexture);
			}
		});

		object.scale.set(scale, scale, scale);

		const box = ObjectUtils.calculateBoundingBox(object);
		const center = new Vector3();
		box.getCenter(center);

		object.position.set(-center.x, -center.y, -center.z);
		object.position.add(position);

		const size = new Vector3();
		box.getSize(size);

		scene.add(object);
		onLoaded && onLoaded(object);

		const result = threeToCannon(object.clone(), {type: ShapeType.BOX});
		const body = new Body();
		body.type = Body.STATIC;
		body.position.set(object.position.x, object.position.y + size.y / 2, object.position.z);
		body.velocity.set(0, 0, 0);
		body.addShape(result.shape);
		world.addBody(body);
	}

	/**
	 * Load GLTF file and place in scene.
	 */
	static loadGLTF(context, url, scale = 1, onLoaded) {
		const loader = new GLTFLoader();
		loader.loadAsync(url).then((gltf: any) => {
			this.loadObject(gltf.scene, context, scale, onLoaded);
		});
	}

	/**
	 * Load Picture and place in scene.
	 */
	static loadPicture(context, url, scale, onLoaded) {
		this.getPictureSize(url).then(({width, height}) => {
			const size = this.scalePictureSize(width, height);
			const picture = new Picture(url, size.width, size.height);
			this.loadObject(context, picture, scale, onLoaded);
		});
	}

	static getPictureSize(picture) {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.onload = () => resolve({height: img.height, width: img.width});
			img.onerror = reject;
			img.src = picture;
		});
	}

	static scalePictureSize(width, height) {
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
}
