import {Box, Entity} from "@belivvr/aframe-react";

import {MapDirectionEnum, PlanimetryBlockTypeEnum} from "@app/enums";
import {PlanimetryBlock, TextureAsset} from "@app/types";
import {defaultWallTexture, WallHeight, WallSize} from "@configs/gallery";
import {convertAllStringToAttributes} from "@utils/converters";

import Ceiling from "./Ceiling";
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
	neighbors = [],
	...props
}: WallProps): JSX.Element {
	const connections: {[key: string]: PlanimetryBlock} = {};

	const floorPosition = {x: position.x, y: 0, z: position.z};
	const ceilingPosition = {x: position.x, y: WallHeight, z: position.z};

	const positionNorth = {x: position.x, y: position.y, z: position.z - WallSize / 3};
	const positionSouth = {x: position.x, y: position.y, z: position.z + WallSize / 3};
	const positionEast = {x: position.x + WallSize / 3, y: position.y, z: position.z};
	const positionWest = {x: position.x - WallSize / 3, y: position.y, z: position.z};

	let isColumn = true;
	neighbors.forEach((neighbor: PlanimetryBlock) => {
		if (neighbor.type === PlanimetryBlockTypeEnum.Wall) {
			connections[neighbor.direction] = neighbor;
			isColumn = false;
		}
	});

	return (
		<Entity>
			{isColumn ? (
				<Box
					{...defaultWallAttributes}
					position={position}
					depth={WallSize / 2}
					width={WallSize / 2}
					color={color}
					{...(texture ? convertAllStringToAttributes(texture.attributes) : {})}
					{...props}
				/>
			) : (
				<Box
					{...defaultWallAttributes}
					position={position}
					depth={WallSize / 3}
					width={WallSize / 3}
					color={color}
					{...(texture ? convertAllStringToAttributes(texture.attributes) : {})}
					{...props}
				/>
			)}
			{connections[MapDirectionEnum.North] && (
				<Box
					{...defaultWallAttributes}
					position={positionNorth}
					depth={WallSize / 3}
					width={WallSize / 3}
					color={color}
					{...(texture ? convertAllStringToAttributes(texture.attributes) : {})}
					{...props}
				/>
			)}
			{connections[MapDirectionEnum.South] && (
				<Box
					{...defaultWallAttributes}
					position={positionSouth}
					depth={WallSize / 3}
					width={WallSize / 3}
					color={color}
					{...(texture ? convertAllStringToAttributes(texture.attributes) : {})}
					{...props}
				/>
			)}
			{connections[MapDirectionEnum.East] && (
				<Box
					{...defaultWallAttributes}
					position={positionEast}
					depth={WallSize / 3}
					width={WallSize / 3}
					color={color}
					{...(texture ? convertAllStringToAttributes(texture.attributes) : {})}
					{...props}
				/>
			)}
			{connections[MapDirectionEnum.West] && (
				<Box
					{...defaultWallAttributes}
					position={positionWest}
					depth={WallSize / 3}
					width={WallSize / 3}
					color={color}
					{...(texture ? convertAllStringToAttributes(texture.attributes) : {})}
					{...props}
				/>
			)}

			<Floor position={floorPosition} navmesh={false} />
			<Ceiling position={ceilingPosition} texture={texture} />
		</Entity>
	);
}
