import type {PlanimetryMap, TGalleryContext} from "@app/types";
import {PlanimetrySchema} from "@utils/planimetry";

function createInitialState(): TGalleryContext {
	return {
		schema: new PlanimetrySchema({
			height: 10,
			width: 10,
			blocks: [],
		} as PlanimetryMap),
		size: 10,
		mode: "planimetry",
		selected: null,
		clearMap: () => {},
		setPlanimetry: () => {},
		onChangeMapSize: () => {},
		onChangeMode: () => {},
		onSelect: () => {},
		onChangeSpawn: () => {},
		onChangeBlock: () => {},
		onChangeColor: () => {},
		onChangeTexture: () => {},
	};
}
export default createInitialState;
