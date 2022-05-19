import {PlanimetryMap} from "@app/types";
import {GalleryActionTypes, PlanimetryBlockType} from "@app/types/enums";
import {getInsideWallFloor, isBlockInsideWalls} from "@utils/planimetry";

import initialState from "./initialState";

export const reducer = (
	state: PlanimetryMap,
	action: {type: GalleryActionTypes; payload?: any},
) => {
	const getSpawnPosition = (planimetry: PlanimetryMap) => {
		let spawn = planimetry.spawn;
		if (planimetry.blocks && planimetry.blocks.length > 0) {
			let position = spawn;
			if (planimetry && spawn !== -1) {
				if (!isBlockInsideWalls(position, planimetry)) {
					position = -1;
					spawn = -1;
				}
			}
			const insideFloor = getInsideWallFloor(planimetry);
			const arrayFloor: number[] = Array.from(insideFloor);
			if (arrayFloor.length > 0 && position === -1) {
				spawn = arrayFloor[0];
			}
		}
		return spawn;
	};
	switch (action.type) {
		case GalleryActionTypes.SetData:
			return {...action.payload, spawn: getSpawnPosition(action.payload)};
		case GalleryActionTypes.SetBlock:
			const newState = {
				...state,
				blocks: [
					...state.blocks.slice(0, action.payload.id),
					action.payload.value,
					...state.blocks.slice(action.payload.id + 1),
				],
			};
			newState.spawn = getSpawnPosition(newState);
			return newState;
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
