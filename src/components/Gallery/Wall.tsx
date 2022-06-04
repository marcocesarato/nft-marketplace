import {Box, Entity} from "@belivvr/aframe-react";

import {MapDirectionEnum, PlanimetryBlockTypeEnum} from "@app/enums";
import {PlanimetryBlock, TextureAsset} from "@app/types";
import {defaultWallTexture, WallHeight, WallSize} from "@configs/gallery";
import {convertAllStringToAttributes} from "@utils/converters";

import Ceiling from "./Ceiling";
import Floor from "./Floor";

const materialWall = {
	"repeat": {x: 1, y: WallHeight},
	"normal-texture-repeat": {x: 1, y: WallHeight},
	"normal-scale": {x: 1, y: WallHeight},
};

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
	texture = {} as TextureAsset,
	color = "#FFFFFF",
	neighbors = [],
	isIntersection = false,
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
	const textureAttributes = texture
		? convertAllStringToAttributes(texture?.attributes ?? {}, materialWall)
		: {};
	const textureNorth =
		isIntersection && connections[MapDirectionEnum.North]?.texture?.attributes
			? convertAllStringToAttributes(
					connections[MapDirectionEnum.North].texture.attributes,
					materialWall,
			  )
			: isIntersection
			? {}
			: textureAttributes;
	const textureSouth =
		isIntersection && connections[MapDirectionEnum.South]?.texture?.attributes
			? convertAllStringToAttributes(
					connections[MapDirectionEnum.South].texture.attributes,
					materialWall,
			  )
			: isIntersection
			? {}
			: textureAttributes;
	const textureWest =
		isIntersection && connections[MapDirectionEnum.West]?.texture?.attributes
			? convertAllStringToAttributes(
					connections[MapDirectionEnum.West].texture.attributes,
					materialWall,
			  )
			: isIntersection
			? {}
			: textureAttributes;
	const textureEast =
		isIntersection && connections[MapDirectionEnum.East]?.texture?.attributes
			? convertAllStringToAttributes(
					connections[MapDirectionEnum.East].texture.attributes,
					materialWall,
			  )
			: isIntersection
			? {}
			: textureAttributes;

	const colorNorth =
		isIntersection && connections[MapDirectionEnum.North]?.color
			? connections[MapDirectionEnum.North]?.color
			: color;
	const colorSouth =
		isIntersection && connections[MapDirectionEnum.South]?.color
			? connections[MapDirectionEnum.South]?.color
			: color;
	const colorWest =
		isIntersection && connections[MapDirectionEnum.West]?.color
			? connections[MapDirectionEnum.West]?.color
			: color;
	const colorEast =
		isIntersection && connections[MapDirectionEnum.East]?.color
			? connections[MapDirectionEnum.East]?.color
			: color;

	return (
		<Entity>
			{isColumn ? (
				<Box
					{...defaultWallAttributes}
					position={position}
					depth={WallSize / 2}
					width={WallSize / 2}
					color={color}
					{...textureAttributes}
					{...props}
				/>
			) : (
				<Box
					{...defaultWallAttributes}
					position={position}
					depth={WallSize / 3}
					width={WallSize / 3}
					color={color}
					{...textureAttributes}
					{...props}
				/>
			)}
			{connections[MapDirectionEnum.North] && (
				<Box
					{...defaultWallAttributes}
					position={positionNorth}
					depth={WallSize / 3}
					width={WallSize / 3}
					color={colorNorth}
					{...textureNorth}
					{...props}
				/>
			)}
			{connections[MapDirectionEnum.South] && (
				<Box
					{...defaultWallAttributes}
					position={positionSouth}
					depth={WallSize / 3}
					width={WallSize / 3}
					color={colorSouth}
					{...textureSouth}
					{...props}
				/>
			)}
			{connections[MapDirectionEnum.East] && (
				<Box
					{...defaultWallAttributes}
					position={positionEast}
					depth={WallSize / 3}
					width={WallSize / 3}
					color={colorEast}
					{...textureEast}
					{...props}
				/>
			)}
			{connections[MapDirectionEnum.West] && (
				<Box
					{...defaultWallAttributes}
					position={positionWest}
					depth={WallSize / 3}
					width={WallSize / 3}
					color={colorWest}
					{...textureWest}
					{...props}
				/>
			)}

			<Floor position={floorPosition} navmesh={false} />
			<Ceiling position={ceilingPosition} />
		</Entity>
	);
}
