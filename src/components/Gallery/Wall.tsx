import {Box, Entity} from "@belivvr/aframe-react";

import {MapDirection, MapDirectionEnum, PlanimetryBlockTypeEnum} from "@app/enums";
import {GenericObject, PlanimetryBlock, TextureAsset} from "@app/types";
import {DefaultColor, DefaultWallTexture, Textures, WallHeight, WallSize} from "@configs/gallery";
import {convertAllStringToAttributes} from "@utils/converters";

import Ceiling from "./Ceiling";
import Floor from "./Floor";

export const DefaultWallAttributes = {
	"shadow": {cast: true, receive: true},
	"physx-body": "type: static",
	"physx-restitution": "1.5",
	...convertAllStringToAttributes(DefaultWallTexture.attributes),
};

const externalBlocks = [
	MapDirectionEnum.North,
	MapDirectionEnum.South,
	MapDirectionEnum.East,
	MapDirectionEnum.West,
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

	// Sizes
	const columnSize = WallSize / 2;
	const wallSize = WallSize / 3;

	// Positions
	const floorPosition = {x: position.x, y: 0, z: position.z};
	const ceilingPosition = {x: position.x, y: WallHeight, z: position.z};
	const blocksPosition = {
		[MapDirectionEnum.North]: {x: position.x, y: position.y, z: position.z - wallSize},
		[MapDirectionEnum.South]: {x: position.x, y: position.y, z: position.z + wallSize},
		[MapDirectionEnum.East]: {x: position.x + wallSize, y: position.y, z: position.z},
		[MapDirectionEnum.West]: {x: position.x - wallSize, y: position.y, z: position.z},
	};

	// Materials
	const wallMaterial = {
		"repeat": {x: 1, y: height},
		"normal-texture-repeat": {x: 1, y: height},
		"normal-scale": {x: 1, y: height},
	};
	const wallTexture = texture
		? convertAllStringToAttributes(texture?.attributes ?? {}, wallMaterial)
		: {};

	// External blocks
	const blocks: MapDirection[] = [];
	const blocksTexture: {[key: string]: GenericObject} = {};
	const blocksColor: {[key: string]: string} = {};
	neighbors.forEach((neighbor: PlanimetryBlock) => {
		if (neighbor.type !== PlanimetryBlockTypeEnum.Floor) {
			connections[neighbor.direction] = neighbor;
			if (externalBlocks.includes(neighbor.direction)) {
				blocks.push(neighbor.direction);
			}
		}
	});
	blocks.forEach((direction: MapDirection) => {
		const conn = connections[direction];
		let textureData: TextureAsset;
		if (conn.texture && Object.prototype.hasOwnProperty.call(Textures, conn.texture)) {
			textureData = Textures[conn.texture];
		}
		blocksTexture[direction] =
			isIncidence && blocksTexture?.attributes
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
				<Box
					{...DefaultWallAttributes}
					position={position}
					depth={columnSize}
					width={columnSize}
					height={height}
					color={color}
					{...wallTexture}
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
					{...wallTexture}
					{...props}
				/>
			)}

			{blocks.map((direction: MapDirection) => {
				return (
					<Box
						{...DefaultWallAttributes}
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

			<Floor position={floorPosition} navmesh={navmesh} />
			<Ceiling position={ceilingPosition} />
		</Entity>
	);
}
