import {Box} from "@belivvr/aframe-react";

import {TextureAsset} from "@app/types";
import {defaultWallTexture, WallHeight, WallSize} from "@configs/gallery";
import {convertAllStringToAttributes} from "@utils/converters";

import Floor from "./Floor";

export const defaultWallAttributes = {
	"height": WallHeight,
	"width": WallSize,
	"depth": WallSize,
	"shadow": {cast: true, receive: true},
	"physx-body": "type: static",
	"physx-restitution": "1.5",
	...convertAllStringToAttributes(defaultWallTexture.attributes),
};

type WallProps = {
	texture?: TextureAsset;
	color?: string;
	position?: {x: number; y: number; z: number};
	[key: string]: any;
};

export default function Wall({
	position,
	texture = null,
	color = "#FFFFFF",
	...props
}: WallProps): JSX.Element {
	return (
		<>
			<Box
				position={position}
				{...defaultWallAttributes}
				color={color}
				{...(texture ? convertAllStringToAttributes(texture.attributes) : {})}
				{...props}
			/>
			<Floor position={position} color={color} texture={texture} navmesh={false} />
		</>
	);
}
