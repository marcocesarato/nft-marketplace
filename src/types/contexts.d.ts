import {PlanimetrySchema} from "@utils/planimetry";

import {PlanimetryBlock, PlanimetryMap, TextureAsset} from "./gallery";
import {GenericObject} from "./globals";

export type TGlobalContext = {
	config: GenericObject;
	setConfig: (payload: GenericObject) => void;
	removeConfig: (payload: GenericObject) => void;
	isMenuOpen: boolean;
	onToggleMenu: () => void;
};

export type TGalleryContext = {
	schema: PlanimetrySchema;
	size: number;
	mode: GalleryBuilderMode;
	selected?: PlanimetryBlock;
	color?: string;
	texture?: TextureAsset;
	resetMap: () => void;
	setPlanimetry: (payload: PlanimetryMap) => void;
	onChangeColor: (payload: string) => void;
	onChangeTexture: (payload: TextureAsset) => void;
	onChangeMapSize: (payload: number) => void;
	onChangeMode: (payload: GalleryBuilderMode) => void;
	onSelect: (payload: PlanimetryBlock) => void;
	onChangeSpawn: (payload: number) => void;
	onChangeBlock: (id: number, block: PlanimetryBlock) => void;
};
