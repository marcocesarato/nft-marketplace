/* global AFRAME, THREE */

const NAF = global.NAF;
NAF.schemas.getComponentsOriginal = NAF.schemas.getComponents;
NAF.schemas.getComponents = (template) => {
	if (!NAF.schemas.hasTemplate("#avatar-template")) {
		NAF.schemas.add({
			template: "#avatar-template",
			components: [
				// position and rotation are added by default if we don't include a template, but since
				// we also want to sync the color, we need to specify a custom template; if we didn't
				// include position and rotation in this custom template, they'd not be synced.
				"position",
				"rotation",

				// this is how we sync a particular property of a particular component for a particular
				// child element of template instances.
				{
					selector: ".head",
					component: "material",
					property: "color", // property is optional; if excluded, syncs everything in the component schema
				},
			],
		});
	}
	const components = NAF.schemas.getComponentsOriginal(template);
	return components;
};

AFRAME.registerComponent("player-info", {
	// notice that color and name are both listed in the schema; NAF will only keep
	// properties declared in the schema in sync.
	schema: {
		name: {type: "string", default: "user-" + Math.round(Math.random() * 10000)},
		color: {
			type: "color", // btw: color is just a string under the hood in A-Frame
			default: () => {
				return (
					"#" +
					new THREE.Color(Math.random(), Math.random(), Math.random()).getHexString()
				);
			},
		},
	},

	init: function () {
		this.head = this.el.querySelector(".head");
		this.nametag = this.el.querySelector(".nametag");

		this.ownedByLocalUser = this.el.id === "player";
		if (this.ownedByLocalUser) {
			// populate the html overlay with the correct name on init
			this.nametagInput = document.getElementById("username-overlay");
			this.nametagInput.value = this.data.name;

			// add the initial color to the html overlay color picker button
			document.querySelector("button").style.backgroundColor = this.data.color;
			document.querySelector("button").style.color = this.data.color;
		}
	},

	// here as an example, not used in current demo. Could build a user list, expanding on this.
	listUsers: function () {
		console.log(
			"userlist",
			[...document.querySelectorAll("[player-info]")].map(
				(el) => el.components["player-info"].data.name,
			),
		);
	},

	newRandomColor: function () {
		this.el.setAttribute("player-info", "color", window.sceneUtils.randomColor());
	},

	update: function () {
		if (this.head) this.head.setAttribute("material", "color", this.data.color);
		if (this.nametag) this.nametag.setAttribute("value", this.data.name);
	},
});
