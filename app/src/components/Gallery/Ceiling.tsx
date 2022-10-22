import {Plane} from "@belivvr/aframe-react";

import {TextureAsset} from "@app/types";
import {DefaultCeilingTexture, WallSize} from "@configs/gallery";
import {convertAllStringToAttributes} from "@utils/converters";

export const defaultCeilingAttributes = {
	"height": WallSize,
	"width": WallSize,
	"shadow": {cast: false, receive: true},
	"rotation": {x: -270, y: 0, z: 0},
	"physx-body": "type: static",
	"physx-restitution": "1.5",
	...convertAllStringToAttributes(DefaultCeilingTexture.attributes),
};

type CeilingProps = {
	color?: string;
	texture?: TextureAsset;
	[key: string]: any;
};

export default function Ceiling({
	color = "#FFFFFF",
	texture = null,
	...props
}: CeilingProps): JSX.Element {
	return (
		<Plane
			{...defaultCeilingAttributes}
			color={color}
			{...(texture ? convertAllStringToAttributes(texture.attributes) : {})}
			{...props}
		/>
	);
}
