import type {PlanimetryBlock, PlanimetryMap} from "@app/types";
import {PlanimetryBlockType} from "@app/types/enums";

export function isMapBorder(i: number, map: PlanimetryMap) {
	return (
		i % map.width === 0 ||
		i % map.width === map.width - 1 ||
		i < map.width ||
		i >= map.width * map.height - map.width
	);
}

export function getNeighbors(i: number, map: PlanimetryMap) {
	const neighbors = [];
	const x = i % map.width;
	const y = Math.floor(i / map.width);
	if (x > 0) neighbors.push(i - 1);
	if (x < map.width - 1) neighbors.push(i + 1);
	if (y > 0) neighbors.push(i - map.width);
	if (y < map.height - 1) neighbors.push(i + map.width);
	return neighbors;
}

export function getNeighborsWithDetails(i: number, map: PlanimetryMap) {
	const neighbors = [];
	const x = i % map.width;
	const blocks: PlanimetryBlock[] = Array.from(map.blocks);
	const y = Math.floor(i / map.width);
	if (x > 0) neighbors.push({direction: "left", ...blocks[i - 1]});
	if (x < map.width - 1) neighbors.push({direction: "right", ...blocks[i + 1]});
	if (y > 0) neighbors.push({direction: "top", ...blocks[i - map.width]});
	if (y < map.height - 1)
		neighbors.push({
			direction: "bottom",
			...blocks[i + map.width],
		});
	return neighbors;
}

export function findConnectedBlocks(i: number, map: PlanimetryMap): Set<number> {
	const blocks = Array.from(map.blocks);
	const value = blocks[i].type;
	const visited = new Set<number>();
	const connected = new Set<number>();
	const toCheck = new Set<number>([i]);
	while (toCheck.size > 0) {
		const current = toCheck.values().next().value;
		toCheck.delete(current);
		visited.add(current);
		connected.add(current);
		const neighbors = getNeighbors(current, map);
		for (const neighbor of neighbors) {
			if (
				blocks[neighbor].type === value &&
				!visited.has(neighbor) &&
				!toCheck.has(neighbor)
			) {
				toCheck.add(neighbor);
			}
		}
	}
	return connected;
}

export function getOutsideWallFloor(map: PlanimetryMap) {
	let planes = new Set<number>();
	const blocks = Array.from(map.blocks);
	for (var x = 0; x < map.height; x++) {
		for (var y = 0; y < map.width; y++) {
			const i = y * map.width + x;
			if (
				isMapBorder(i, map) &&
				(blocks[i].type === PlanimetryBlockType.Floor || blocks[i].type == null)
			) {
				// Add all connected planes to outsideWallsPlanes
				const connected = findConnectedBlocks(i, map);
				planes = new Set([...planes, ...connected]);
			}
		}
	}
	return planes;
}

export function getInsideWallFloor(map: PlanimetryMap) {
	const outsidePlanes = getOutsideWallFloor(map);
	let planes = new Set<number>();
	const blocks = Array.from(map.blocks);
	for (var i = 0; i < blocks.length; i++) {
		if (
			(blocks[i].type === PlanimetryBlockType.Floor || blocks[i].type == null) &&
			!outsidePlanes.has(i)
		) {
			planes.add(i);
		}
	}
	return planes;
}

export function isBlockInsideWalls(i: number, map: PlanimetryMap) {
	const outsidePlanes = getInsideWallFloor(map);
	return outsidePlanes.has(i);
}
