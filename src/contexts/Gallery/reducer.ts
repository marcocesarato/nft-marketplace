import {GalleryActionTypes, GalleryActionTypesEnum, PlanimetryBlockTypeEnum} from "@app/enums";
import {PlanimetryMap} from "@app/types";
import {clone} from "@utils/converters";
import {PlanimetrySchema} from "@utils/planimetry";

import {createInitialSchema} from "./initialState";

export const reducer = (
	state: PlanimetrySchema,
	action: {type: GalleryActionTypes; payload?: any},
) => {
	let newState = new PlanimetrySchema();
	const planimetryMap: PlanimetryMap = state.getMap();
	switch (action.type) {
		case GalleryActionTypesEnum.SetData: {
			newState.setMap(clone(action.payload));
			return newState;
		}
		case GalleryActionTypesEnum.SetBlock: {
			let resultMap: PlanimetryMap = {} as PlanimetryMap;
			resultMap = clone(planimetryMap);
			resultMap.blocks[action.payload.value.id] = clone(action.payload.value);
			newState.setMap(resultMap);
			return newState;
		}
		case GalleryActionTypesEnum.SetSpawn: {
			if (
				state.isBlockInsideWalls(action.payload) &&
				planimetryMap.blocks[action.payload]?.type !== PlanimetryBlockTypeEnum.Wall
			) {
				const map = state.getMap();
				newState.setMap(map);
				newState.setSpawn(action.payload);
				return newState;
			}
			return state;
		}
		case GalleryActionTypesEnum.SetSize:
		case GalleryActionTypesEnum.ResetMap: {
			return createInitialSchema(action.payload || planimetryMap.width);
		}
		default:
			return state;
	}
};
export default reducer;
