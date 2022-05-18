import type {PlanimetryMap, TGalleryPlanimetryContext} from "@app/types";

const initialState: TGalleryPlanimetryContext = {
	planimetry: {
		height: 20,
		width: 20,
		blocks: [],
	} as PlanimetryMap,
	size: 20,
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

export default initialState;
