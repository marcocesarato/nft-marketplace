/* global AFRAME, THREE, NAF */

NAF.schemas.getComponentsOriginal = NAF.schemas.getComponents;
NAF.schemas.getComponents = (template) => {
	if (!NAF.schemas.hasTemplate("#avatar-template")) {
		NAF.schemas.add({
			template: "#avatar-template",
			components: ["position", "rotation", "avatar"],
		});
	}
	const components = NAF.schemas.getComponentsOriginal(template);
	return components;
};

AFRAME.registerComponent("avatar", {
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
		this.updateNametag();
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

		// Body
		this.body = document.createElement("a-entity");
		this.body.setAttribute("mixin", "mixin-body");

		// Neck
		this.neck = document.createElement("a-entity");
		this.neck.setAttribute("mixin", "mixin-neck");

		// Arms
		this.leftArm = document.createElement("a-entity");
		this.leftArm.setAttribute("mixin", "mixin-arm");

		this.rightArm = document.createElement("a-entity");
		this.rightArm.setAttribute("mixin", "mixin-arm");

		// Eyes
		this.leftEye = document.createElement("a-entity");
		this.leftEye.setAttribute("mixin", "mixin-eye");

		this.rightEye = document.createElement("a-entity");
		this.rightEye.setAttribute("mixin", "mixin-eye");

		this.leftPupil = document.createElement("a-entity");
		this.leftPupil.setAttribute("mixin", "mixin-pupil");

		this.rightPupil = document.createElement("a-entity");
		this.rightPupil.setAttribute("mixin", "mixin-pupil");

		this.updateAvatar();

		// Avatar
		this.avatar = document.createElement("a-entity");
		this.avatar.appendChild(this.head);
		this.avatar.appendChild(this.neck);
		this.avatar.appendChild(this.body);
		this.avatar.appendChild(this.leftEye);
		this.avatar.appendChild(this.rightEye);
		this.avatar.appendChild(this.leftPupil);
		this.avatar.appendChild(this.rightPupil);
		this.avatar.appendChild(this.leftArm);
		this.avatar.appendChild(this.rightArm);

		this.el.appendChild(this.avatar);
	},

	updateAvatar: function () {
		if (!this.avatar) return;

		// Head
		this.head.setAttribute("color", "#" + this.data.color);
		this.head.setAttribute("material", "color", "#" + this.data.color);

		// Neck
		this.neck.setAttribute("position", "0 -1 0");
		this.neck.setAttribute("rotation", "0 0 0");
		this.neck.setAttribute("color", "#" + this.data.color);
		this.neck.setAttribute("material", "color", "#" + this.data.color);

		// Body
		this.body.setAttribute("position", "0 -1.5 0");
		this.body.setAttribute("rotation", "0 0 0");
		this.body.setAttribute("color", "#" + this.data.color);
		this.body.setAttribute("material", "color", "#" + this.data.color);

		// Eyes
		this.leftEye.setAttribute("position", "0.25 0.2 -0.6");
		this.leftPupil.setAttribute("position", "0.25 0.2 -0.8");

		this.rightEye.setAttribute("position", "-0.25 0.2 -0.6");
		this.rightPupil.setAttribute("position", "-0.25 0.2 -0.8");

		// Arms
		this.rightArm.setAttribute("color", "#" + this.data.color);
		this.rightArm.setAttribute("material", "color", "#" + this.data.color);
		this.rightArm.setAttribute("position", "0.45 -1.4 0");
		this.rightArm.setAttribute("rotation", "0 0 25");

		this.leftArm.setAttribute("color", "#" + this.data.color);
		this.leftArm.setAttribute("material", "color", "#" + this.data.color);
		this.leftArm.setAttribute("position", "-0.45 -1.4 0");
		this.leftArm.setAttribute("rotation", "0 0 -25");
	},

	updateNametag: function () {
		if (!this.nametag) return;

		this.nametag.setAttribute("value", this.data.name);
		this.nametag.setAttribute("rotation", "0 180 0");
		this.nametag.setAttribute("scale", ".5 .5 .5");
		this.nametag.setAttribute("position", ".25 1 0");
	},
});
