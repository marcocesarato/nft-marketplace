import {GalleryActionTypes, GalleryActionTypesEnum, PlanimetryBlockTypeEnum} from "@app/enums";
import {PlanimetryMap} from "@app/types";
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
		case GalleryActionTypesEnum.SetData:
			newState.setMap(clone(action.payload));
			return newState;
		case GalleryActionTypesEnum.SetBlock:
			resultMap = clone(planimetryMap);
			resultMap.blocks[action.payload.value.id] = clone(action.payload.value);
			newState.setMap(resultMap);
			return newState;
		case GalleryActionTypesEnum.SetSpawn:
			if (
				state.isBlockInsideWalls(action.payload) &&
				planimetryMap.blocks[action.payload]?.type !== PlanimetryBlockTypeEnum.Wall
			) {
				const map = state.getMap();
				newState.setMap(map);
				newState.setSpawn(action.payload);
			}
			return newState;
		case GalleryActionTypesEnum.SetSize:
		case GalleryActionTypesEnum.ResetMap:
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
					type: PlanimetryBlockTypeEnum.Floor,
				};
			}
			newState.setMap(map);
			return newState;
		default:
			return state;
	}
};
export default reducer;
