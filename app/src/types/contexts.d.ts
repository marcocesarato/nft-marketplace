import {PlanimetrySchema} from "@utils/planimetry";

import {PlanimetryBlock, PlanimetryMap, TextureAsset} from "./gallery";
import {GenericObject} from "./globals";

export type TGlobalContext = {
	config: GenericObject;
	data: GenericObject;
	mergeData: (payload: GenericObject) => void;
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
	mouseDown: boolean;
	mouseRightDown: boolean;
	setSchema: (payload: PlanimetryMap) => void;
	onChangeColor: (payload: string) => void;
	onChangeTexture: (payload: TextureAsset) => void;
	onChangeMapSize: (payload: number) => void;
	onChangeMode: (payload: GalleryBuilderMode) => void;
	onSelect: (payload: PlanimetryBlock) => void;
	onChangeSpawn: (payload: number) => void;
	onChangeBlock: (id: number, block: PlanimetryBlock) => void;
	onChangeBlockMetadata: (id: number, metadata: GenericObject) => void;
	onMouseDown: (payload: boolean) => void;
	onMouseRightDown: (payload: boolean) => void;
};
