import type {PlanimetryMap} from "@app/types";
import {PlanimetryBlockType} from "@app/types/enums";

export function isMapBorderTop(i: number, map: PlanimetryMap) {
	return i < map.width;
}

export function isMapBorderBottom(i: number, map: PlanimetryMap) {
	return i >= map.width * map.height - map.width;
}

export function isMapBorderLeft(i: number, map: PlanimetryMap) {
	return i % map.width === 0;
}

export function isMapBorderRight(i: number, map: PlanimetryMap) {
	return i % map.width === map.width - 1;
}

export function isMapBorder(i: number, map: PlanimetryMap) {
	return (
		isMapBorderTop(i, map) ||
		isMapBorderBottom(i, map) ||
		isMapBorderLeft(i, map) ||
		isMapBorderRight(i, map)
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

export function getNeighborsDetails(i: number, map: PlanimetryMap) {
	const neighbors = [];
	const x = i % map.width;
	const y = Math.floor(i / map.width);
	if (x > 0) neighbors.push({direction: "left", ...map.blocks[i - 1]});
	if (x < map.width - 1) neighbors.push({direction: "right", ...map.blocks[i + 1]});
	if (y > 0) neighbors.push({direction: "top", ...map.blocks[i - map.width]});
	if (y < map.height - 1)
		neighbors.push({
			direction: "bottom",
			...map.blocks[i + map.width],
		});
	return neighbors;
}

export function findConnectedBlocks(i: number, map: PlanimetryMap): Set<number> {
	const type = map.blocks[i]?.type;
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
				map.blocks[neighbor]?.type === type &&
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
	for (var x = 0; x < map.height; x++) {
		for (var y = 0; y < map.width; y++) {
			const i = y * map.width + x;
			if (
				!planes.has(i) &&
				isMapBorder(i, map) &&
				(!map.blocks[i] ||
					map.blocks[i].type === PlanimetryBlockType.Floor ||
					map.blocks[i].type == null)
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
	for (var i = 0; i < map.blocks.length; i++) {
		if (
			!planes.has(i) &&
			!outsidePlanes.has(i) &&
			(map.blocks[i].type === PlanimetryBlockType.Floor || map.blocks[i].type == null)
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

export function isValidPlanimetry(map: PlanimetryMap) {
	const insideFloor = getInsideWallFloor(map);
	return insideFloor.size > 0;
}
