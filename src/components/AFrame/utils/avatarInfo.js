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

		this.head = this.el.querySelector(".head");
		this.nametag = this.el.querySelector(".nametag");
		this.createAvatar();

		this.ownedByLocalUser = this.el.id === "avatar";
	},

	update: function () {
		if (this.head) {
			this.head.setAttribute("color", "#" + this.data.color);
			this.head.setAttribute("material", "color", "#" + this.data.color);
		}
		if (this.nametag) {
			this.nametag.setAttribute("value", this.data.name);
			this.nametag.setAttribute("rotation", "0 180 0");
			this.nametag.setAttribute("scale", ".5 .5 .5");
			this.nametag.setAttribute("position", ".25 1 0");
		}
	},

	createAvatar: function () {
		const attr = {
			color: "#" + this.data.color,
			material: "color: #" + this.data.color,
			radius: "0.75",
			height: "0.7",
			width: "0.7",
		};

		const head = document.createElement("a-sphere");
		for (const name in attr) {
			head.setAttribute(name, attr[name]);
		}

		const leye = document.createElement("a-entity");
		leye.setAttribute("mixin", "mixin-eye");
		const reye = document.createElement("a-entity");
		reye.setAttribute("mixin", "mixin-eye");

		const lpupil = document.createElement("a-entity");
		lpupil.setAttribute("mixin", "mixin-pupil");
		const rpupil = document.createElement("a-entity");
		rpupil.setAttribute("mixin", "mixin-pupil");

		const larm = document.createElement("a-entity");
		larm.setAttribute("mixin", "mixin-arm");
		const rarm = document.createElement("a-entity");
		rarm.setAttribute("mixin", "mixin-arm");
		const body = document.createElement("a-entity");

		body.setAttribute("mixin", "mixin-body");

		const x = 0;
		const y = 0;
		const z = 0;

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

		leye.setAttribute("position", leyex + " " + leyey + " " + leyez);
		reye.setAttribute("position", reyex + " " + reyey + " " + reyez);

		lpupil.setAttribute("position", lpx + " " + lpy + " " + lpz);
		rpupil.setAttribute("position", rpx + " " + rpy + " " + rpz);

		const larmx = x - 0.5;
		const larmy = y - 1.8;
		const larmz = z;

		const rarmx = x + 0.5;
		const rarmy = y - 1.8;
		const rarmz = z;

		larm.setAttribute("position", larmx + " " + larmy + " " + larmz);
		larm.setAttribute("rotation", "0 0 -10");
		rarm.setAttribute("position", rarmx + " " + rarmy + " " + rarmz);
		rarm.setAttribute("rotation", "0 0 10");

		body.setAttribute("position", "0 -1.25 0");
		body.setAttribute("rotation", "0 0 0");

		rarm.setAttribute("color", "#" + this.data.color);
		rarm.setAttribute("material", "color", "#" + this.data.color);
		larm.setAttribute("color", "#" + this.data.color);
		larm.setAttribute("material", "color", "#" + this.data.color);

		body.setAttribute("color", "#" + this.data.color);
		body.setAttribute("material", "color", "#" + this.data.color);

		//wrap the whole avatar inside a single entity
		const avatarRoot = document.createElement("a-entity");
		avatarRoot.appendChild(head);
		avatarRoot.appendChild(leye);
		avatarRoot.appendChild(reye);
		avatarRoot.appendChild(lpupil);
		avatarRoot.appendChild(rpupil);
		avatarRoot.appendChild(larm);
		avatarRoot.appendChild(rarm);
		avatarRoot.appendChild(body);

		this.el.appendChild(avatarRoot);
	},
});
