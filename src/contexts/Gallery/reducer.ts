import {GalleryActionType, GalleryActionTypeEnum, PlanimetryBlockTypeEnum} from "@app/enums";
import {PlanimetryBlock, PlanimetryMap} from "@app/types";
import {clone} from "@utils/converters";
import {PlanimetrySchema} from "@utils/planimetry";

import {createInitialSchema} from "./initialState";

export const reducer = (
	state: PlanimetrySchema,
	action: {type: GalleryActionType; payload?: any; callback?: (block?: PlanimetryBlock) => void},
) => {
	let newState = Object.assign(Object.create(Object.getPrototypeOf(state)), state);
	const planimetryMap: PlanimetryMap = state.getMap();
	switch (action.type) {
		case GalleryActionTypeEnum.SetData: {
			newState.setMap(clone(action.payload));
			action.callback && action.callback();
			return newState;
		}
		case GalleryActionTypeEnum.SetBlock: {
			let resultMap: PlanimetryMap = {} as PlanimetryMap;
			resultMap = clone(planimetryMap);
			resultMap.blocks[action.payload.value.id] = clone(action.payload.value);
			newState.setMap(resultMap);
			action.callback && action.callback(action.payload.value);
			return newState;
		}
		case GalleryActionTypeEnum.SetBlockMetadata: {
			newState.setBlockMetadata(action.payload.value.id, action.payload.value);
			action.callback && action.callback(action.payload.value);
			return newState;
		}
		case GalleryActionTypeEnum.SetSpawn: {
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
		case GalleryActionTypeEnum.SetSize:
		case GalleryActionTypeEnum.ResetMap: {
			action.callback && action.callback();
			return createInitialSchema(action.payload || planimetryMap.width);
		}
		default:
			return state;
	}
};
export default reducer;
