import type {PlanimetryMap} from "@app/types";
import {PlanimetryBlockType} from "@app/types/enums";

export class PlanimetrySchema {
	private map: PlanimetryMap;
	private blocksInsideWall: Set<number> = new Set();
	private blocksOutsideWall: Set<number> = new Set();

	constructor(planimetryMap?: PlanimetryMap) {
		this.map = planimetryMap || ({} as PlanimetryMap);
	}

	public setMap(planimetryMap: PlanimetryMap) {
		if (this.map.blocks !== planimetryMap.blocks) {
			this.blocksInsideWall = new Set();
			this.blocksOutsideWall = new Set();
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

	public getBlocks() {
		return this.map.blocks;
	}

	public isMapBorderTop(i: number) {
		return i < this.map.width;
	}

	public isMapBorderBottom(i: number) {
		return i >= this.map.width * this.map.height - this.map.width;
	}

	public isMapBorderLeft(i: number) {
		return i % this.map.width === 0;
	}

	public isMapBorderRight(i: number) {
		return i % this.map.width === this.map.width - 1;
	}

	public isMapBorder(i: number) {
		return (
			this.isMapBorderTop(i) ||
			this.isMapBorderBottom(i) ||
			this.isMapBorderLeft(i) ||
			this.isMapBorderRight(i)
		);
	}

	adjustSpawnPosition = () => {
		let spawn = this.getSpawn();
		const blocks = this.getBlocks();
		if (blocks && blocks.length > 0) {
			if (spawn !== -1) {
				if (!this.isBlockInsideWalls(spawn)) {
					spawn = -1;
				}
			}
			if (spawn === -1) {
				const insideFloor = this.getInsideWallBlocks();
				const arrayFloor: number[] = Array.from(insideFloor);
				if (arrayFloor.length > 0) {
					spawn = arrayFloor[0];
				}
			}
		}
		this.map.spawn = spawn;
	};

	public getNeighbors(i: number) {
		const neighbors = [];
		const x = i % this.map.width;
		const y = Math.floor(i / this.map.width);
		if (x > 0) neighbors.push(i - 1);
		if (x < this.map.width - 1) neighbors.push(i + 1);
		if (y > 0) neighbors.push(i - this.map.width);
		if (y < this.map.height - 1) neighbors.push(i + this.map.width);
		return neighbors;
	}

	public getNeighborsDetails(i: number) {
		const neighbors = [];
		const x = i % this.map.width;
		const y = Math.floor(i / this.map.width);
		if (x > 0) neighbors.push({direction: "left", ...this.map.blocks[i - 1]});
		if (x < this.map.width - 1) neighbors.push({direction: "right", ...this.map.blocks[i + 1]});
		if (y > 0) neighbors.push({direction: "top", ...this.map.blocks[i - this.map.width]});
		if (y < this.map.height - 1)
			neighbors.push({
				direction: "bottom",
				...this.map.blocks[i + this.map.width],
			});
		return neighbors;
	}

	private findConnectedBlocks(i: number): Set<number> {
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
		return connected;
	}

	public getOutsideWallBlocks() {
		if (this.blocksOutsideWall.size > 0) return this.blocksOutsideWall;
		for (var x = 0; x < this.map.height; x++) {
			for (var y = 0; y < this.map.width; y++) {
				const i = y * this.map.width + x;
				if (
					!this.blocksOutsideWall.has(i) &&
					this.isMapBorder(i) &&
					(!this.map.blocks[i] ||
						this.map.blocks[i].type === PlanimetryBlockType.Floor ||
						this.map.blocks[i].type == null)
				) {
					// Add all connected planes to outsideWallsPlanes
					const connected = this.findConnectedBlocks(i);
					this.blocksOutsideWall = new Set([...this.blocksOutsideWall, ...connected]);
				}
			}
		}
		return this.blocksOutsideWall;
	}

	public getInsideWallBlocks() {
		if (this.blocksInsideWall.size > 0) return this.blocksInsideWall;
		const outsidePlanes = this.getOutsideWallBlocks();
		for (var i = 0; i < this.map.blocks.length; i++) {
			if (
				!this.blocksInsideWall.has(i) &&
				!outsidePlanes.has(i) &&
				(this.map.blocks[i].type === PlanimetryBlockType.Floor ||
					this.map.blocks[i].type == null)
			) {
				this.blocksInsideWall.add(i);
			}
		}
		return this.blocksInsideWall;
	}

	public isBlockInsideWalls(i: number) {
		const outsidePlanes = this.getInsideWallBlocks();
		return outsidePlanes.has(i);
	}

	public isValidPlanimetry() {
		const insideFloor = this.getInsideWallBlocks();
		return insideFloor.size > 0;
	}
}
