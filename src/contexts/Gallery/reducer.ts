import {PlanimetryMap} from "@app/types";
import {GalleryActionTypes, PlanimetryBlockType} from "@app/types/enums";
import {clone} from "@utils/converters";
import {getInsideWallFloor, isBlockInsideWalls} from "@utils/planimetry";

import initialState from "./initialState";

export const reducer = (
	state: PlanimetryMap,
	action: {type: GalleryActionTypes; payload?: any},
) => {
	let result: PlanimetryMap = {} as PlanimetryMap;
	const getSpawnPosition = (planimetry: PlanimetryMap) => {
		let spawn = planimetry.spawn;
		if (planimetry.blocks && planimetry.blocks.length > 0) {
			if (planimetry && spawn !== -1) {
				if (!isBlockInsideWalls(spawn, planimetry)) {
					spawn = -1;
				}
			}
			if (spawn === -1) {
				const insideFloor = getInsideWallFloor(planimetry);
				const arrayFloor: number[] = Array.from(insideFloor);
				if (arrayFloor.length > 0) {
					spawn = arrayFloor[0];
				}
			}
		}
		return spawn;
	};
	switch (action.type) {
		case GalleryActionTypes.SetData:
			return {...action.payload, spawn: getSpawnPosition(action.payload)};
		case GalleryActionTypes.SetBlock:
			result = clone(state);
			result.blocks[action.payload.value.id] = action.payload.value;
			result.spawn = getSpawnPosition(result);
			return result;
		case GalleryActionTypes.SetSpawn:
			if (
				isBlockInsideWalls(action.payload, state) &&
				state.blocks[action.payload]?.type !== PlanimetryBlockType.Wall
			) {
				return {
					...state,
					spawn: action.payload,
				};
			}
			return state;
		case GalleryActionTypes.SetSize:
		case GalleryActionTypes.ResetMap:
			const size = action.payload || state.width || initialState.size;
			const map: PlanimetryMap = {
				height: size,
				width: size,
				blocks: [],
			};
			for (let i = 0; i < size * size; i++) {
				map.blocks[i] = {
					id: i,
					texture: null,
					color: null,
					type: PlanimetryBlockType.Floor,
				};
			}
			return map;
		default:
			return state;
	}
};
export default reducer;
