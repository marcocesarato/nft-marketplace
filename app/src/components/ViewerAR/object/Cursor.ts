import {CircleGeometry, Mesh, MeshBasicMaterial, RingGeometry} from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * Cursor is used to interfact with the environment.
 * The cursor moves around with the device.
 *
 * @extends {Mesh}
 */
export default class Cursor extends Mesh {
	public onAction = null;
	constructor(geometry?, material?) {
		if (!geometry) {
			const ring = new RingGeometry(0.045, 0.05, 32).rotateX(-Math.PI / 2);
			const dot = new CircleGeometry(0.005, 32).rotateX(-Math.PI / 2);
			geometry = BufferGeometryUtils.mergeBufferGeometries([ring, dot]);
		}

		if (!material) {
			material = new MeshBasicMaterial({opacity: 0.4, depthTest: false, transparent: true});
		}

		super(geometry, material);

		// If false does not change position, rotation etc properties the matrix property automatically
		this.matrixAutoUpdate = false;
		this.visible = false;

		/**
		 * Callback method to execute when the cursor is pressed.
		 * Receives the pose of the cursor in world coordinates.
		 */
		this.onAction = null;
	}
}
