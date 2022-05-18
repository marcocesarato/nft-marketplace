import {PlanimetryBlockType} from "./enums";

export type PlanimetryBlock = {
	id: number;
	texture?: TextureAsset;
	color?: string;
	type?: PlanimetryBlockType;
	objects?: {
		top?: ObjectModel;
		bottom?: ObjectModel;
		left?: ObjectModel;
		right?: ObjectModel;
		groud?: ObjectModel;
		ceiling?: ObjectModel;
	};
};

export type PlanimetryMap = {
	blocks: PlanimetryBlock[];
	width: number;
	height: number;
	spawn?: number;
};

export type TextureAsset = {
	name: string;
	image: string;
	attributes: {
		[key: string]: string;
	};
};

export type ObjectModel = {
	name: string;
	image: string;
	type: ObjectModelType;
	attributes: {
		[key: string]: string;
	};
	planeAttributes?: {
		[key: string]: string;
	};
};
