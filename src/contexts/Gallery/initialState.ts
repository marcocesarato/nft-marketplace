import type {PlanimetryMap, TGalleryPlanimetryContext} from "@app/types";

const initialState: TGalleryPlanimetryContext = {
	planimetry: {
		height: 10,
		width: 10,
		blocks: [],
	} as PlanimetryMap,
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

export default initialState;
