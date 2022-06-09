import {Box, Entity} from "@belivvr/aframe-react";

import {MapDirectionEnum, PlanimetryBlockTypeEnum} from "@app/enums";
import {PlanimetryBlock, TextureAsset} from "@app/types";
import {DefaultColor, DefaultWallTexture, WallHeight, WallSize} from "@configs/gallery";
import {convertAllStringToAttributes} from "@utils/converters";

import Ceiling from "./Ceiling";
import Floor from "./Floor";

export const DefaultWallAttributes = {
	"shadow": {cast: true, receive: true},
	"physx-body": "type: static",
	"physx-restitution": "1.5",
	...convertAllStringToAttributes(DefaultWallTexture.attributes),
};

type WallProps = {
	texture?: TextureAsset;
	color?: string;
	position?: {x: number; y: number; z: number};
	rotation?: {x: number; y: number; z: number};
	neighbors: PlanimetryBlock[];
	navmesh?: boolean;
	height?: number;
	isColumn?: boolean;
	isIntersection?: boolean;
	[key: string]: any;
};

export default function Wall({
	position,
	texture = {} as TextureAsset,
	color = DefaultColor,
	neighbors = [],
	navmesh = false,
	height = WallHeight,
	isColumn = false,
	isIntersection = false,
	...props
}: WallProps): JSX.Element {
	const connections: {[key: string]: PlanimetryBlock} = {};

	const columnSize = WallSize / 2;
	const wallSize = WallSize / 3;
	const floorPosition = {x: position.x, y: 0, z: position.z};
	const ceilingPosition = {x: position.x, y: WallHeight, z: position.z};

	const positionNorth = {x: position.x, y: position.y, z: position.z - WallSize / 3};
	const positionSouth = {x: position.x, y: position.y, z: position.z + WallSize / 3};
	const positionEast = {x: position.x + WallSize / 3, y: position.y, z: position.z};
	const positionWest = {x: position.x - WallSize / 3, y: position.y, z: position.z};

	const materialWall = {
		"repeat": {x: 1, y: height},
		"normal-texture-repeat": {x: 1, y: height},
		"normal-scale": {x: 1, y: height},
	};

	neighbors.forEach((neighbor: PlanimetryBlock) => {
		if (neighbor.type !== PlanimetryBlockTypeEnum.Floor) {
			connections[neighbor.direction] = neighbor;
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
			: isIntersection
			? DefaultColor
			: color;
	const colorSouth =
		isIntersection && connections[MapDirectionEnum.South]?.color
			? connections[MapDirectionEnum.South]?.color
			: isIntersection
			? DefaultColor
			: color;
	const colorWest =
		isIntersection && connections[MapDirectionEnum.West]?.color
			? connections[MapDirectionEnum.West]?.color
			: isIntersection
			? DefaultColor
			: color;
	const colorEast =
		isIntersection && connections[MapDirectionEnum.East]?.color
			? connections[MapDirectionEnum.East]?.color
			: isIntersection
			? DefaultColor
			: color;

	return (
		<Entity>
			{isColumn ? (
				<Box
					{...DefaultWallAttributes}
					position={position}
					depth={columnSize}
					width={columnSize}
					height={height}
					color={color}
					{...textureAttributes}
					{...props}
				/>
			) : (
				<Box
					{...DefaultWallAttributes}
					position={position}
					depth={wallSize}
					width={wallSize}
					height={height}
					color={color}
					{...textureAttributes}
					{...props}
				/>
			)}
			{connections[MapDirectionEnum.North] && (
				<Box
					{...DefaultWallAttributes}
					position={positionNorth}
					depth={wallSize}
					width={wallSize}
					height={height}
					color={colorNorth}
					{...textureNorth}
					{...props}
				/>
			)}
			{connections[MapDirectionEnum.South] && (
				<Box
					{...DefaultWallAttributes}
					position={positionSouth}
					depth={wallSize}
					width={wallSize}
					height={height}
					color={colorSouth}
					{...textureSouth}
					{...props}
				/>
			)}
			{connections[MapDirectionEnum.East] && (
				<Box
					{...DefaultWallAttributes}
					position={positionEast}
					depth={wallSize}
					width={wallSize}
					height={height}
					color={colorEast}
					{...textureEast}
					{...props}
				/>
			)}
			{connections[MapDirectionEnum.West] && (
				<Box
					{...DefaultWallAttributes}
					position={positionWest}
					depth={wallSize}
					width={wallSize}
					height={height}
					color={colorWest}
					{...textureWest}
					{...props}
				/>
			)}

			<Floor position={floorPosition} navmesh={navmesh} />
			<Ceiling position={ceilingPosition} />
		</Entity>
	);
}
