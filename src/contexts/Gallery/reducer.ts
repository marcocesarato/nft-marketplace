import {PlanimetryMap} from "@app/types";
import {GalleryActionTypes, PlanimetryBlockType} from "@app/types/enums";
import {clone} from "@utils/converters";
import {PlanimetrySchema} from "@utils/planimetry";

export const reducer = (
	state: PlanimetrySchema,
	action: {type: GalleryActionTypes; payload?: any},
) => {
	let newState = new PlanimetrySchema();
	let resultMap: PlanimetryMap = {} as PlanimetryMap;
	const planimetryMap: PlanimetryMap = state.getMap();
	switch (action.type) {
		case GalleryActionTypes.SetData:
			newState.setMap(clone(action.payload));
			return newState;
		case GalleryActionTypes.SetBlock:
			resultMap = clone(planimetryMap);
			resultMap.blocks[action.payload.value.id] = clone(action.payload.value);
			newState.setMap(resultMap);
			return newState;
		case GalleryActionTypes.SetSpawn:
			if (
				newState.isBlockInsideWalls(action.payload) &&
				planimetryMap.blocks[action.payload]?.type !== PlanimetryBlockType.Wall
			) {
				newState.setMap({...planimetryMap, spawn: action.payload});
				return newState;
			}
			return newState;
		case GalleryActionTypes.SetSize:
		case GalleryActionTypes.ResetMap:
			const size = Math.max(action.payload || planimetryMap.width || 10, 20);
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
			newState.setMap(map);
			return newState;
		default:
			return state;
	}
};
export default reducer;
