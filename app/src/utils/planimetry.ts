import {MapDirection, ObjectModelType, PlanimetryBlockType} from "@app/enums";
import type {GenericObject, PlanimetryBlock, PlanimetryMap, TokenItem} from "@app/types";
import {acceptAudio, acceptModel, acceptVideo} from "@configs/uploads";
//import {debounce} from "@utils/common";

export class PlanimetrySchema {
	private map: PlanimetryMap;
	private blocksInsideRoom: Set<number> = new Set();
	private blocksOutsideRoom: Set<number> = new Set();
	private connectedBlockTypes = [
		[PlanimetryBlockType.Door, PlanimetryBlockType.Floor],
		[PlanimetryBlockType.Window, PlanimetryBlockType.Wall],
	];
	//private debouncedAdjustSpawn: () => void;

	constructor(planimetryMap?: PlanimetryMap) {
		//this.debouncedAdjustSpawn = debounce(this.adjustSpawn.bind(this), 300, true);
		this.setMap(planimetryMap || ({} as PlanimetryMap));
	}

	public setMap(planimetryMap: PlanimetryMap) {
		this.blocksInsideRoom = new Set();
		this.blocksOutsideRoom = new Set();
		this.map = planimetryMap;
		this.adjustSpawn();
	}

	public getMap() {
		return this.map;
	}

	public getSpawn() {
		return this.map.spawn;
	}

	public setSpawn(spawn: number) {
		if (this.isBlockInsideWalls(spawn) || spawn == null) {
			this.map.spawn = spawn;
		}
	}

	public getBlocks() {
		return this.map.blocks;
	}

	public getBlock(i: number) {
		return this.map.blocks[i];
	}

	public setBlockMetadata(i: number, data: GenericObject) {
		this.map.blocks[i] = {
			...this.map.blocks[i],
			...data,
			id: this.map.blocks[i].id,
			type: this.map.blocks[i].type,
		};
	}

	public isMapBorderNorth(i: number) {
		return i < this.map.width;
	}

	public isMapBorderSouth(i: number) {
		return i >= this.map.width * this.map.height - this.map.width;
	}

	public isMapBorderWest(i: number) {
		return i % this.map.width === 0;
	}

	public isMapBorderEast(i: number) {
		return i % this.map.width === this.map.width - 1;
	}

	public isMapBorder(i: number) {
		return (
			this.isMapBorderNorth(i) ||
			this.isMapBorderSouth(i) ||
			this.isMapBorderWest(i) ||
			this.isMapBorderEast(i)
		);
	}

	public getNeighbors(i: number): PlanimetryBlock[] {
		const neighbors = [];
		const x = i % this.map.width;
		const y = Math.floor(i / this.map.width);
		if (x > 0)
			neighbors.push({
				direction: MapDirection.West,
				...this.map.blocks[i - 1],
			});
		if (x < this.map.width - 1)
			neighbors.push({
				direction: MapDirection.East,
				...this.map.blocks[i + 1],
			});
		if (y > 0)
			neighbors.push({
				direction: MapDirection.North,
				...this.map.blocks[i - this.map.width],
			});
		if (y < this.map.height - 1)
			neighbors.push({
				direction: MapDirection.South,
				...this.map.blocks[i + this.map.width],
			});
		if (x > 0 && y > 0)
			neighbors.push({
				direction: MapDirection.NorthWest,
				...this.map.blocks[i - this.map.width - 1],
			});
		if (x < this.map.width - 1 && y > 0)
			neighbors.push({
				direction: MapDirection.NorthEast,
				...this.map.blocks[i - this.map.width + 1],
			});
		if (x > 0 && y < this.map.height - 1)
			neighbors.push({
				direction: MapDirection.SouthWest,
				...this.map.blocks[i + this.map.width - 1],
			});
		if (x < this.map.width - 1 && y < this.map.height - 1)
			neighbors.push({
				direction: MapDirection.SouthEast,
				...this.map.blocks[i + this.map.width + 1],
			});
		return neighbors;
	}

	private getConnectedBlocks(
		i: number,
		direction?: MapDirection,
	): {connected: Set<number>; visited: Set<number>} {
		const type = this.map.blocks[i]?.type;
		const connections = this.connectedBlockTypes.find((types) => types.includes(type));
		const visited = new Set<number>();
		const connected = new Set<number>();
		const toCheck = new Set<number>([i]);
		while (toCheck.size > 0) {
			const current = toCheck.values().next().value;
			toCheck.delete(current);
			visited.add(current);
			connected.add(current);
			const neighbors = this.getNeighbors(current);
			for (const neighbor of neighbors) {
				if (
					connections.includes(neighbor.type) &&
					!visited.has(neighbor.id) &&
					!toCheck.has(neighbor.id) &&
					(direction == null || neighbor.direction === direction)
				) {
					toCheck.add(neighbor.id);
				}
			}
		}
		return {connected, visited};
	}

	public getBlocksOutsideRoom() {
		if (this.blocksOutsideRoom.size > 0) return this.blocksOutsideRoom;
		let toCheck = new Set<number>([...Array(this.map.blocks.length).keys()]);
		while (toCheck.size > 0) {
			const i = toCheck.values().next().value;
			toCheck.delete(i);
			if (
				this.isMapBorder(i) &&
				(!this.map.blocks[i] || this.map.blocks[i].type === PlanimetryBlockType.Floor)
			) {
				const {connected, visited} = this.getConnectedBlocks(i);
				toCheck = new Set([...toCheck].filter((x) => !visited.has(x)));
				// Add all connected planes to outsideWallsPlanes
				this.blocksOutsideRoom = new Set([...this.blocksOutsideRoom, ...connected]);
			}
		}
		return this.blocksOutsideRoom;
	}

	public getBlocksInsideRoom(): Set<number> {
		if (this.blocksInsideRoom.size > 0) return this.blocksInsideRoom;
		const outsidePlanes = this.getBlocksOutsideRoom();
		const allBlocks = new Set<number>([...Array(this.map.blocks.length).keys()]);
		this.blocksInsideRoom = new Set(
			[...allBlocks].filter(
				(x) =>
					!outsidePlanes.has(x) && this.map.blocks[x].type === PlanimetryBlockType.Floor,
			),
		);
		return this.blocksInsideRoom;
	}

	public isRoomPerimeter(i: number) {
		const block = this.map.blocks[i];
		const outsideWalls = this.getBlocksOutsideRoom();
		if (block.type === PlanimetryBlockType.Floor) return outsideWalls.has(i);
		const neighbors = this.getNeighbors(i);
		for (const neighbor of neighbors) {
			if (neighbor.type === PlanimetryBlockType.Floor && outsideWalls.has(neighbor.id))
				return true;
		}
		return false;
	}

	public isBlockColorable(i: number): boolean {
		const block = this.map.blocks[i];
		if (block.type === PlanimetryBlockType.Floor && !this.isBlockInsideWalls(i)) return false;
		return true;
	}

	public isBlockInsideWalls(i: number) {
		return this.getBlocksInsideRoom().has(i);
	}

	public isValidPlanimetry() {
		const insideFloor = this.getBlocksInsideRoom();
		return insideFloor.size > 0;
	}

	public getLongestConnectedBlocksDirection(i: number): MapDirection {
		const {connected: connectedNorth} = this.getConnectedBlocks(i, MapDirection.North);
		const {connected: connectedSouth} = this.getConnectedBlocks(i, MapDirection.South);
		const {connected: connectedWest} = this.getConnectedBlocks(i, MapDirection.West);
		const {connected: connectedEast} = this.getConnectedBlocks(i, MapDirection.East);
		const max = Math.max(
			connectedNorth.size,
			connectedSouth.size,
			connectedWest.size,
			connectedEast.size,
		);
		if (max === connectedNorth.size) return MapDirection.North;
		if (max === connectedSouth.size) return MapDirection.South;
		if (max === connectedWest.size) return MapDirection.West;
		if (max === connectedEast.size) return MapDirection.East;
		return MapDirection.North;
	}

	public getDirectionRotation(direction: MapDirection) {
		switch (direction) {
			case MapDirection.South:
				return {x: 0, y: 0, z: 0};
			case MapDirection.West:
				return {x: 0, y: -90, z: 0};
			case MapDirection.East:
				return {x: 0, y: -270, z: 0};
			case MapDirection.North:
			default:
				return {x: 0, y: 180, z: 0};
		}
	}

	public isColumn(i: number): boolean {
		const block = this.map.blocks?.[i];
		if (!block) return false;
		const neighbors = this.getNeighbors(block.id);
		let isColumn = true;
		neighbors.forEach((neighbor: PlanimetryBlock) => {
			if (neighbor.type !== PlanimetryBlockType.Floor) {
				isColumn = false;
			}
		});
		return isColumn;
	}

	public isStraightSegment(i: number): boolean {
		const neighbors = this.getNeighbors(i);
		const intsersections = [
			[MapDirection.North, MapDirection.South],
			[MapDirection.West, MapDirection.East],
		];
		for (const [a, b] of intsersections) {
			const blockA = neighbors.find(
				(x) => x.type !== PlanimetryBlockType.Floor && x.direction === a,
			);
			const blockB = neighbors.find(
				(x) => x.type !== PlanimetryBlockType.Floor && x.direction === b,
			);
			if (blockA && blockB) {
				return true;
			}
		}
		return false;
	}

	public isIncidenceSegment(i: number): boolean {
		const block = this.map.blocks?.[i];
		if (!block) return false;
		const neighbors = this.getNeighbors(block.id);
		const intsersections = [
			[MapDirection.North, MapDirection.East],
			[MapDirection.North, MapDirection.West],
			[MapDirection.South, MapDirection.East],
			[MapDirection.South, MapDirection.West],
		];
		for (const [a, b] of intsersections) {
			const blockA = neighbors.find(
				(x) => x.type !== PlanimetryBlockType.Floor && x.direction === a,
			);
			const blockB = neighbors.find(
				(x) => x.type !== PlanimetryBlockType.Floor && x.direction === b,
			);
			if (blockA && blockB) return true;
		}
		return false;
	}

	public adjustSpawn() {
		let spawn = this.getSpawn();
		if ((this.map.blocks.length ?? 0) > 0) {
			if (spawn != null) {
				if (!this.isBlockInsideWalls(spawn)) {
					spawn = null;
				}
			}
			if (spawn == null) {
				const insideFloor = this.getBlocksInsideRoom();
				const arrayFloor: number[] = Array.from(insideFloor);
				if (arrayFloor.length > 0) {
					spawn = arrayFloor[0];
				}
			}
		}
		this.setSpawn(spawn);
	}
}

export function getObjectModelType(item: TokenItem): ObjectModelType {
	if (item.animation_url) {
		const isObject = acceptModel.some(function (suffix: string) {
			return item.animation_url.endsWith(suffix);
		});
		if (isObject) return ObjectModelType.Object;

		const isVideo = acceptVideo.some(function (suffix: string) {
			return item.animation_url.endsWith(suffix);
		});
		if (isVideo) return ObjectModelType.Video;

		const isAudio = acceptAudio.some(function (suffix: string) {
			return item.animation_url.endsWith(suffix);
		});
		if (isAudio) return ObjectModelType.Audio;
	}
	return ObjectModelType.Picture;
}
