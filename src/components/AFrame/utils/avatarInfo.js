/* global AFRAME, THREE, NAF */

NAF.schemas.getComponentsOriginal = NAF.schemas.getComponents;
NAF.schemas.getComponents = (template) => {
	if (!NAF.schemas.hasTemplate("#avatar-template")) {
		NAF.schemas.add({
			template: "#avatar-template",
			components: ["position", "rotation", "avatar-info"],
		});
	}
	const components = NAF.schemas.getComponentsOriginal(template);
	return components;
};

AFRAME.registerComponent("avatar-info", {
	// notice that color and name are both listed in the schema; NAF will only keep
	// properties declared in the schema in sync.
	schema: {
		name: {type: "string", default: "user-" + Math.round(Math.random() * 10000)},
		color: {
			type: "color",
			default: new THREE.Color(Math.random(), Math.random(), Math.random()).getHexString(),
		},
	},

	init: function () {
		if (!this.data.name) return;

		this.nametag = this.el.querySelector(".nametag");
		this.ownedByLocalUser = this.el.id === "avatar";

		this.createAvatar();
	},

	update: function () {
		this.updateAvatar();
		if (this.nametag) {
			this.nametag.setAttribute("value", this.data.name);
			this.nametag.setAttribute("rotation", "0 180 0");
			this.nametag.setAttribute("scale", ".5 .5 .5");
			this.nametag.setAttribute("position", ".25 1 0");
		}
	},

	createAvatar: function () {
		// Head
		this.head = document.createElement("a-sphere");
		const attr = {
			class: "head",
			color: "#" + this.data.color,
			material: "color: #" + this.data.color,
			radius: "0.75",
			height: "0.7",
			width: "0.7",
		};
		for (const name in attr) {
			this.head.setAttribute(name, attr[name]);
		}

		// Eyes
		this.leftEye = document.createElement("a-entity");
		this.leftEye.setAttribute("mixin", "mixin-eye");

		this.rightEye = document.createElement("a-entity");
		this.rightEye.setAttribute("mixin", "mixin-eye");

		this.leftPupil = document.createElement("a-entity");
		this.leftPupil.setAttribute("mixin", "mixin-pupil");

		this.rightPupil = document.createElement("a-entity");
		this.rightPupil.setAttribute("mixin", "mixin-pupil");

		// Arms
		this.leftArm = document.createElement("a-entity");
		this.leftArm.setAttribute("mixin", "mixin-arm");

		this.rightArm = document.createElement("a-entity");
		this.rightArm.setAttribute("mixin", "mixin-arm");

		// Body
		this.body = document.createElement("a-entity");
		this.body.setAttribute("mixin", "mixin-body");

		// Neck
		this.neck = document.createElement("a-entity");
		this.neck.setAttribute("mixin", "mixin-neck");

		this.updateAvatar();

		//wrap the whole avatar inside a single entity
		const avatarRoot = document.createElement("a-entity");
		avatarRoot.appendChild(this.head);
		avatarRoot.appendChild(this.leftEye);
		avatarRoot.appendChild(this.rightEye);
		avatarRoot.appendChild(this.leftPupil);
		avatarRoot.appendChild(this.rightPupil);
		avatarRoot.appendChild(this.leftArm);
		avatarRoot.appendChild(this.rightArm);
		avatarRoot.appendChild(this.body);
		avatarRoot.appendChild(this.neck);

		this.el.appendChild(avatarRoot);
	},

	updateAvatar: function () {
		if (!this.head) return;

		const x = 0;
		const y = 0;
		const z = 0;

		// Head
		this.head.setAttribute("color", "#" + this.data.color);
		this.head.setAttribute("material", "color", "#" + this.data.color);

		// Eyes
		const leyex = x + 0.25;
		const leyey = y + 0.2;
		const leyez = z - 0.6;

		const reyex = x - 0.25;
		const reyey = y + 0.2;
		const reyez = z - 0.6;

		const lpx = x + 0.25;
		const lpy = y + 0.2;
		const lpz = z - 0.8;

		const rpx = x - 0.25;
		const rpy = y + 0.2;
		const rpz = z - 0.8;

		this.leftEye.setAttribute("position", leyex + " " + leyey + " " + leyez);
		this.leftPupil.setAttribute("position", lpx + " " + lpy + " " + lpz);
		this.rightPupil.setAttribute("position", rpx + " " + rpy + " " + rpz);
		this.rightEye.setAttribute("position", reyex + " " + reyey + " " + reyez);

		// Arms
		const larmx = x - 0.45;
		const larmy = y - 1.4;
		const larmz = z;

		const rarmx = x + 0.45;
		const rarmy = y - 1.4;
		const rarmz = z;

		this.rightArm.setAttribute("color", "#" + this.data.color);
		this.rightArm.setAttribute("material", "color", "#" + this.data.color);
		this.rightArm.setAttribute("position", rarmx + " " + rarmy + " " + rarmz);
		this.rightArm.setAttribute("rotation", "0 0 25");
		this.leftArm.setAttribute("color", "#" + this.data.color);
		this.leftArm.setAttribute("material", "color", "#" + this.data.color);
		this.leftArm.setAttribute("position", larmx + " " + larmy + " " + larmz);
		this.leftArm.setAttribute("rotation", "0 0 -25");

		// Body
		this.body.setAttribute("position", "0 -1.5 0");
		this.body.setAttribute("rotation", "0 0 0");
		this.body.setAttribute("color", "#" + this.data.color);
		this.body.setAttribute("material", "color", "#" + this.data.color);

		// Neck
		this.neck.setAttribute("position", "0 -1 0");
		this.neck.setAttribute("rotation", "0 0 0");
		this.neck.setAttribute("color", "#" + this.data.color);
		this.neck.setAttribute("material", "color", "#" + this.data.color);
	},
});
