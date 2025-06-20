import {Box, Cylinder, Entity} from "@belivvr/aframe-react";

import {MapDirection, PlanimetryBlockType} from "@app/enums";
import {GenericObject, PlanimetryBlock, TextureAsset} from "@app/types";
import {DefaultColor, DefaultWallTexture, Textures, WallHeight, WallSize} from "@configs/gallery";
import {convertAllStringToAttributes} from "@utils/converters";

import Ceiling from "./Ceiling";
import Floor from "./Floor";

export const DefaultWallAttributes = {
	"shadow": {cast: false, receive: true},
	"physx-body": "type: static",
	"physx-restitution": "1.5",
	...convertAllStringToAttributes(DefaultWallTexture.attributes),
};

const externalBlocks = [
	MapDirection.North,
	MapDirection.South,
	MapDirection.East,
	MapDirection.West,
];

type WallProps = {
	texture?: TextureAsset;
	color?: string;
	position?: {x: number; y: number; z: number};
	rotation?: {x: number; y: number; z: number};
	neighbors: PlanimetryBlock[];
	navmesh?: boolean;
	height?: number;
	isColumn?: boolean;
	isIncidence?: boolean;
	[key: string]: any;
};

export default function Wall({
	position,
	texture,
	color = DefaultColor,
	neighbors = [],
	navmesh = false,
	height = WallHeight,
	isColumn = false,
	isIncidence = false,
	...props
}: WallProps): JSX.Element {
	const connections: {[key: string]: PlanimetryBlock} = {};
	const floors: PlanimetryBlock[] = [];

	// Sizes
	const columnSize = WallSize / 2;
	const wallSize = WallSize / 3;

	// Positions
	const floorPosition = {x: position.x, y: 0, z: position.z};
	const ceilingPosition = {x: position.x, y: WallHeight, z: position.z};
	const blocksPosition = {
		[MapDirection.North]: {x: position.x, y: position.y, z: position.z - wallSize},
		[MapDirection.South]: {x: position.x, y: position.y, z: position.z + wallSize},
		[MapDirection.East]: {x: position.x + wallSize, y: position.y, z: position.z},
		[MapDirection.West]: {x: position.x - wallSize, y: position.y, z: position.z},
	};

	// Materials
	const wallMaterial = {
		"repeat": {x: isColumn ? 4 : 1, y: height},
		"normal-texture-repeat": {x: isColumn ? 4 : 1, y: height},
		"normal-scale": {x: isColumn ? 4 : 1, y: height},
	};
	const wallTexture = texture
		? convertAllStringToAttributes(texture?.attributes ?? {}, wallMaterial)
		: {};

	// External blocks
	const blocks: MapDirection[] = [];
	const blocksTexture: {[key: string]: GenericObject} = {};
	const blocksColor: {[key: string]: string} = {};
	neighbors.forEach((neighbor: PlanimetryBlock) => {
		if (neighbor.type === PlanimetryBlockType.Floor) {
			if (externalBlocks.includes(neighbor.direction) || isIncidence) {
				floors.push(neighbor);
			}
		} else {
			connections[neighbor.direction] = neighbor;
			if (externalBlocks.includes(neighbor.direction)) {
				blocks.push(neighbor.direction);
			}
		}
	});

	// Floor
	let commonFloorTextureData: TextureAsset;
	const commonFloorTexture = floors
		.sort(
			(a, b) =>
				floors.filter((v) => v.texture === a.texture).length -
				floors.filter((v) => v.texture === b.texture).length,
		)
		.pop()?.texture;
	if (commonFloorTexture && Object.prototype.hasOwnProperty.call(Textures, commonFloorTexture)) {
		commonFloorTextureData = Textures[commonFloorTexture];
	}
	const commonFloorColor = floors
		.sort(
			(a, b) =>
				floors.filter((v) => v.color === a.color).length -
				floors.filter((v) => v.color === b.color).length,
		)
		.pop()?.color;

	// Walls
	blocks.forEach((direction: MapDirection) => {
		const conn = connections[direction];
		let textureData: TextureAsset;
		if (conn.texture && Object.prototype.hasOwnProperty.call(Textures, conn.texture)) {
			textureData = Textures[conn.texture];
		}
		blocksTexture[direction] =
			isIncidence && textureData?.attributes
				? convertAllStringToAttributes(textureData.attributes, wallMaterial)
				: isIncidence
				? {}
				: wallTexture;
		blocksColor[direction] =
			isIncidence && conn.color ? conn.color : isIncidence ? DefaultColor : color;
	});

	return (
		<Entity>
			{isColumn ? (
				<Cylinder
					{...DefaultWallAttributes}
					position={position}
					depth={columnSize}
					width={columnSize}
					height={height}
					color={color}
					{...wallTexture}
					{...props}
					shadow={{cast: true, receive: true}}
				/>
			) : (
				<Box
					{...DefaultWallAttributes}
					position={position}
					depth={wallSize}
					width={wallSize}
					height={height}
					color={color}
					{...wallTexture}
					{...props}
				/>
			)}

			{blocks.map((direction: MapDirection) => {
				return (
					<Box
						{...DefaultWallAttributes}
						key={direction}
						position={blocksPosition[direction]}
						depth={wallSize}
						width={wallSize}
						height={height}
						color={blocksColor[direction]}
						{...blocksTexture[direction]}
						{...props}
					/>
				);
			})}

			<Floor
				position={floorPosition}
				navmesh={navmesh}
				color={commonFloorColor}
				texture={commonFloorTextureData}
			/>
			<Ceiling position={ceilingPosition} />
		</Entity>
	);
}
