import {MapDirection, MapDirectionEnum, PlanimetryBlockTypeEnum} from "@app/enums";
import type {GenericObject, PlanimetryBlock, PlanimetryMap} from "@app/types";
import {debounce} from "@utils/common";

export class PlanimetrySchema {
	private map: PlanimetryMap;
	private blocksInsideRoom: Set<number> = new Set();
	private blocksOutsideRoom: Set<number> = new Set();

	constructor(planimetryMap?: PlanimetryMap) {
		this.map = planimetryMap || ({} as PlanimetryMap);
		this.adjustSpawnPosition = debounce(this.adjustSpawnPosition.bind(this), 300, true);
	}

	public setMap(planimetryMap: PlanimetryMap) {
		if (this.map.blocks !== planimetryMap.blocks) {
			this.blocksInsideRoom = new Set();
			this.blocksOutsideRoom = new Set();
		}
		this.map = planimetryMap;
		this.adjustSpawnPosition();
	}

	public getMap() {
		return this.map;
	}

	public getSpawn() {
		return this.map.spawn;
	}

	public setSpawn(spawn: number) {
		this.map.spawn = spawn;
	}

	public getBlocks() {
		return this.map.blocks;
	}

	public setBlockMetadata(i: number, metadata: GenericObject) {
		this.map.blocks[i] = {
			...this.map.blocks[i],
			...metadata,
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

	public adjustSpawnPosition() {
		let spawn = this.getSpawn();
		const blocks = this.getBlocks();
		if (blocks && blocks.length > 0) {
			if (spawn !== -1) {
				if (!this.isBlockInsideWalls(spawn)) {
					spawn = -1;
				}
			}
			if (spawn === -1) {
				const insideFloor = this.getBlocksInsideRoom();
				const arrayFloor: number[] = Array.from(insideFloor);
				if (arrayFloor.length > 0) {
					spawn = arrayFloor[0];
				}
			}
		}
		this.map.spawn = spawn;
	}

	public getNeighbors(i: number) {
		const neighbors = [];
		const x = i % this.map.width;
		const y = Math.floor(i / this.map.width);
		if (x > 0) neighbors.push(i - 1);
		if (x < this.map.width - 1) neighbors.push(i + 1);
		if (y > 0) neighbors.push(i - this.map.width);
		if (y < this.map.height - 1) neighbors.push(i + this.map.width);
		if (x > 0 && y > 0) neighbors.push(i - this.map.width - 1);
		if (x < this.map.width - 1 && y > 0) neighbors.push(i - this.map.width + 1);
		if (x > 0 && y < this.map.height - 1) neighbors.push(i + this.map.width - 1);
		if (x < this.map.width - 1 && y < this.map.height - 1)
			neighbors.push(i + this.map.width + 1);
		return neighbors;
	}

	public getNeighborsDetails(i: number): PlanimetryBlock[] {
		const neighbors = [];
		const x = i % this.map.width;
		const y = Math.floor(i / this.map.width);
		if (x > 0)
			neighbors.push({
				direction: MapDirectionEnum.West,
				...this.map.blocks[i - 1],
			});
		if (x < this.map.width - 1)
			neighbors.push({
				direction: MapDirectionEnum.East,
				...this.map.blocks[i + 1],
			});
		if (y > 0)
			neighbors.push({
				direction: MapDirectionEnum.North,
				...this.map.blocks[i - this.map.width],
			});
		if (y < this.map.height - 1)
			neighbors.push({
				direction: MapDirectionEnum.South,
				...this.map.blocks[i + this.map.width],
			});
		if (x > 0 && y > 0)
			neighbors.push({
				direction: MapDirectionEnum.NorthWest,
				...this.map.blocks[i - this.map.width - 1],
			});
		if (x < this.map.width - 1 && y > 0)
			neighbors.push({
				direction: MapDirectionEnum.NorthEast,
				...this.map.blocks[i - this.map.width + 1],
			});
		if (x > 0 && y < this.map.height - 1)
			neighbors.push({
				direction: MapDirectionEnum.SouthWest,
				...this.map.blocks[i + this.map.width - 1],
			});
		if (x < this.map.width - 1 && y < this.map.height - 1)
			neighbors.push({
				direction: MapDirectionEnum.SouthEast,
				...this.map.blocks[i + this.map.width + 1],
			});
		return neighbors;
	}

	private getConnectedBlocks(i: number): {connected: Set<number>; visited: Set<number>} {
		const type = this.map.blocks[i]?.type;
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
					this.map.blocks[neighbor]?.type === type &&
					!visited.has(neighbor) &&
					!toCheck.has(neighbor)
				) {
					toCheck.add(neighbor);
				}
			}
		}
		return {connected, visited};
	}

	private getConnectedBlocksOnDirection(i: number, direction: MapDirection): Set<number> {
		const type = this.map.blocks[i]?.type;
		const visited = new Set<number>();
		const connected = new Set<number>();
		const toCheck = new Set<number>([i]);
		while (toCheck.size > 0) {
			const current = toCheck.values().next().value;
			toCheck.delete(current);
			visited.add(current);
			connected.add(current);
			const neighbors = this.getNeighborsDetails(current);
			for (const neighbor of neighbors) {
				if (
					neighbor.type === type &&
					neighbor.direction === direction &&
					!visited.has(neighbor.id) &&
					!toCheck.has(neighbor.id)
				) {
					toCheck.add(neighbor.id);
				}
			}
		}
		return connected;
	}

	public getBlocksOutsideRoom() {
		if (this.blocksOutsideRoom.size > 0) return this.blocksOutsideRoom;
		let toCheck = new Set<number>([...Array(this.map.blocks.length).keys()]);
		while (toCheck.size > 0) {
			const i = toCheck.values().next().value;
			toCheck.delete(i);
			if (
				!this.blocksOutsideRoom.has(i) &&
				this.isMapBorder(i) &&
				(!this.map.blocks[i] || this.map.blocks[i].type === PlanimetryBlockTypeEnum.Floor)
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
					!outsidePlanes.has(x) &&
					this.map.blocks[x].type === PlanimetryBlockTypeEnum.Floor,
			),
		);
		return this.blocksInsideRoom;
	}

	public isRoomPerimeter(i: number) {
		const block = this.map.blocks[i];
		if (block.type !== PlanimetryBlockTypeEnum.Wall) return false;
		const outsideWalls = this.getBlocksOutsideRoom();
		const neighbors = this.getNeighborsDetails(i);
		for (const neighbor of neighbors) {
			if (neighbor.type === PlanimetryBlockTypeEnum.Floor && outsideWalls.has(neighbor.id))
				return true;
		}
		return false;
	}

	public isBlockColorable(i: number): boolean {
		const block = this.map.blocks[i];
		if (block.type === PlanimetryBlockTypeEnum.Floor && !this.isBlockInsideWalls(i))
			return false;
		return true;
	}

	public isBlockInsideWalls(i: number) {
		const outsidePlanes = this.getBlocksInsideRoom();
		return outsidePlanes.has(i);
	}

	public isValidPlanimetry() {
		const insideFloor = this.getBlocksInsideRoom();
		return insideFloor.size > 0;
	}

	public getLongestConnectedBlocksDirection(i: number): MapDirection {
		const connectedNorth = this.getConnectedBlocksOnDirection(i, MapDirectionEnum.North);
		const connectedSouth = this.getConnectedBlocksOnDirection(i, MapDirectionEnum.South);
		const connectedWest = this.getConnectedBlocksOnDirection(i, MapDirectionEnum.West);
		const connectedEast = this.getConnectedBlocksOnDirection(i, MapDirectionEnum.East);
		const max = Math.max(
			connectedNorth.size,
			connectedSouth.size,
			connectedWest.size,
			connectedEast.size,
		);
		if (max === connectedNorth.size) return MapDirectionEnum.North;
		if (max === connectedSouth.size) return MapDirectionEnum.South;
		if (max === connectedWest.size) return MapDirectionEnum.West;
		if (max === connectedEast.size) return MapDirectionEnum.East;
		return MapDirectionEnum.North;
	}

	public getDirectionRotation(direction: MapDirection) {
		switch (direction) {
			case MapDirectionEnum.South:
				return {x: 0, y: 180, z: 0};
			case MapDirectionEnum.West:
				return {x: 0, y: 90, z: 0};
			case MapDirectionEnum.East:
				return {x: 0, y: 270, z: 0};
			case MapDirectionEnum.North:
			default:
				return {x: 0, y: 0, z: 0};
		}
	}

	public isIntersection(i: number): boolean {
		const block = this.map.blocks?.[i];
		if (!block) return false;
		const neighbors = this.getNeighborsDetails(block.id);
		const intsersections = [
			[MapDirectionEnum.North, MapDirectionEnum.East],
			[MapDirectionEnum.North, MapDirectionEnum.West],
			[MapDirectionEnum.South, MapDirectionEnum.East],
			[MapDirectionEnum.South, MapDirectionEnum.West],
		];
		for (const intersection of intsersections) {
			const a = neighbors.find(
				(x) => x.type !== PlanimetryBlockTypeEnum.Floor && x.direction === intersection[0],
			);
			const b = neighbors.find(
				(x) => x.type !== PlanimetryBlockTypeEnum.Floor && x.direction === intersection[1],
			);
			if (a && b) return true;
		}
		return false;
	}

	public isColumn(i: number): boolean {
		const block = this.map.blocks?.[i];
		if (!block) return false;
		const neighbors = this.getNeighborsDetails(block.id);
		let isColumn = true;
		neighbors.forEach((neighbor: PlanimetryBlock) => {
			if (neighbor.type !== PlanimetryBlockTypeEnum.Floor) {
				isColumn = false;
			}
		});
		return isColumn;
	}
}
