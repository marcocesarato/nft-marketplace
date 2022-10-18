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

		this.ownedByLocalUser = this.el.id === "head";
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
			this.nametag.setAttribute("position", ".25 1.35 0");
		}
	},
});
