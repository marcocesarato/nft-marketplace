import {GenericObject} from "./globals";
import {PlanimetryBlock, PlanimetryMap} from "./planimetry";

export type TGlobalContext = {
	config: GenericObject;
	setConfig: (payload: GenericObject) => void;
	removeConfig: (payload: GenericObject) => void;
	isMenuOpen: boolean;
	onToggleMenu: () => void;
};

export type TGalleryPlanimetryContext = {
	planimetry: PlanimetryMap;
	size: number;
	mode: string;
	selected?: PlanimetryBlock;
	color?: string;
	texture?: string;
	clearMap: () => void;
	setPlanimetry: (payload: PlanimetryMap) => void;
	onChangeColor: (payload: string) => void;
	onChangeTexture: (payload: string) => void;
	onChangeMapSize: (payload: number) => void;
	onChangeMode: (payload: string) => void;
	onSelect: (payload: PlanimetryBlock) => void;
	onChangeSpawn: (payload: number) => void;
	onChangeBlock: (id: number, block: PlanimetryBlock) => void;
};
