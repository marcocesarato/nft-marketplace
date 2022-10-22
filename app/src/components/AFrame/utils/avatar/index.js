/* global AFRAME, NAF */

import {avatarMoveComponent} from "./avatar";
import {receiveMessage} from "./avatarInit";
import {animationRigComponent} from "./rigAnimation.js";

AFRAME.registerComponent("avatar-move", avatarMoveComponent);
AFRAME.registerComponent("rig-animation", animationRigComponent);
window.addEventListener("message", receiveMessage, false);

NAF.schemas.getComponentsOriginal = NAF.schemas.getComponents;
NAF.schemas.getComponents = (template) => {
	if (!NAF.schemas.hasTemplate("#avatar-template")) {
		NAF.schemas.add({
			template: "#avatar-template",
			components: [
				"position",
				{
					selector: ":scope",
					component: "rotation",
					callback: (rotation) => {
						if (rotation?.y) {
							rotation.x = 0;
							return rotation;
						}
						if (typeof rotation !== "string") return rotation;
						const rotationArr = rotation.split(" ");
						return `0 ${rotationArr[1] || 0} 0`;
					},
				},
				{
					selector: ".avatar",
					component: "gltf-model",
				},
				{
					selector: ".avatar",
					component: "scale",
				},
				{
					selector: ".avatar",
					component: "rig-animation",
				},
				{
					selector: ".avatar",
					component: "avatar-move",
					requiresNetworkUpdate: NAF.utils.vectorRequiresUpdate(0.5),
				},
				{
					selector: ".avatar",
					component: "shadow",
				},
				{
					selector: ".avatar",
					component: "position",
				},
				{
					selector: ".avatar",
					component: "rotation",
				},
			],
		});
	}
	const components = NAF.schemas.getComponentsOriginal(template);
	return components;
};
