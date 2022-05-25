import {Entity} from "@belivvr/aframe-react";

import {TextureAsset} from "@app/types";

export const defaultCeilingAttributes = {
	"shadow": {cast: false, receive: true},
	"rotation": {x: -270, y: 0, z: 0},
	"physx-body": "type: static",
	"physx-restitution": "1.5",
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
		<Entity
			{...defaultCeilingAttributes}
			color={color}
			{...(texture ? texture.attributes : {})}
			{...props}
		/>
	);
}
