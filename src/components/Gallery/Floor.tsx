import {Plane} from "@belivvr/aframe-react";

import {TextureAsset} from "@app/types";
import {WallSize} from "@configs/gallery";

export const defaultFloorAttributes = {
	"height": WallSize,
	"width": WallSize,
	"shadow": {cast: false, receive: true},
	"rotation": {x: -90, y: 0, z: 0},
	"physx-body": "type: static",
	"physx-restitution": "1.5",
};

export const navmeshAttributes = {
	"class": "navmesh",
	"nav-mesh": "",
};

type FloorProps = {
	navmesh?: boolean;
	color?: string;
	texture?: TextureAsset;
	[key: string]: any;
};

export default function Floor({
	navmesh = false,
	color = "#FFFFFF",
	texture = null,
	...props
}: FloorProps): JSX.Element {
	return (
		<Plane
			{...defaultFloorAttributes}
			color={color}
			{...(texture ? texture.attributes : {})}
			{...(navmesh ? navmeshAttributes : {})}
			{...props}
		/>
	);
}
