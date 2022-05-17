import {PlanimetryBlockType} from "./enums";

export type PlanimetryBlock = {
	id: number;
	texture?: TextureAsset;
	color?: string;
	type?: PlanimetryBlockType;
	objects?: {
		up?: ObjectModel;
		down?: ObjectModel;
		left?: ObjectModel;
		right?: ObjectModel;
		groud?: ObjectModel;
		ceiling?: ObjectModel;
	};
};

export type PlanimetryMap = {
	blocks: Set<PlanimetryBlock>;
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
	attributes: {
		[key: string]: string;
	};
	planeAttributes?: {
		[key: string]: string;
	};
};
