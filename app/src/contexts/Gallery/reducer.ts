import {GalleryActionType, GalleryActionTypeEnum, PlanimetryBlockTypeEnum} from "@app/enums";
import {PlanimetryBlock, PlanimetryMap} from "@app/types";
import {clone} from "@utils/converters";
import {PlanimetrySchema} from "@utils/planimetry";

import {createInitialSchema} from "./initialState";

export const reducer = (
	state: PlanimetrySchema,
	action: {type: GalleryActionType; payload?: any; callback?: (block?: PlanimetryBlock) => void},
) => {
	const newState = Object.assign(Object.create(Object.getPrototypeOf(state)), state);
	const map: PlanimetryMap = state.getMap();
	switch (action.type) {
		case GalleryActionTypeEnum.SetData: {
			newState.setMap(clone(action.payload));
			action.callback && action.callback();
			return newState;
		}
		case GalleryActionTypeEnum.SetBlock: {
			map.blocks[action.payload.value.id] = clone(action.payload.value);
			newState.setMap(map);
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
				state.getBlock(action.payload)?.type !== PlanimetryBlockTypeEnum.Wall
			) {
				newState.setSpawn(action.payload);
				return newState;
			}
			return state;
		}
		case GalleryActionTypeEnum.SetSize:
		case GalleryActionTypeEnum.ResetMap: {
			action.callback && action.callback();
			return createInitialSchema(action.payload || map.width);
		}
		default:
			return state;
	}
};
export default reducer;
