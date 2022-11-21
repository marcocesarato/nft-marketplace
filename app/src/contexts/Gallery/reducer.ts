import {GalleryActionType, PlanimetryBlockType} from "@app/enums";
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
		case GalleryActionType.SetData: {
			newState.setMap(clone(action.payload));
			action.callback && action.callback();
			return newState;
		}
		case GalleryActionType.SetBlock: {
			map.blocks[action.payload.value.id] = clone(action.payload.value);
			newState.setMap(map);
			action.callback && action.callback(action.payload.value);
			return newState;
		}
		case GalleryActionType.SetBlockMetadata: {
			newState.setBlockMetadata(action.payload.value.id, action.payload.value);
			action.callback && action.callback(action.payload.value);
			return newState;
		}
		case GalleryActionType.SetSpawn: {
			if (
				state.isBlockInsideWalls(action.payload) &&
				state.getBlock(action.payload)?.type !== PlanimetryBlockType.Wall
			) {
				newState.setSpawn(action.payload);
				return newState;
			}
			return state;
		}
		case GalleryActionType.SetSize:
		case GalleryActionType.ResetMap: {
			action.callback && action.callback();
			return createInitialSchema(action.payload || map.width);
		}
		default:
			return state;
	}
};
export default reducer;
