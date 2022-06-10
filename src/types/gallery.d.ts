import {GalleryAssetTypes, MapDirection, PlanimetryBlockType} from "@app/enums";

import {NFT} from "./marketplace";

export type PlanimetryBlock = {
	id: number;
	texture?: TextureAsset;
	color?: string;
	type?: PlanimetryBlockType;
	direction?: MapDirection;
	items?: {
		north?: ObjectModel;
		south?: ObjectModel;
		west?: ObjectModel;
		east?: ObjectModel;
		up?: ObjectModel;
		down?: ObjectModel;
	};
};

export type PlanimetryMap = {
	blocks: PlanimetryBlock[];
	width: number;
	height: number;
	spawn?: number;
};

export type GalleryAsset = {
	id: string;
	src: string;
	type: GalleryAssetTypes;
};

export type TextureAsset = {
	name: string;
	image: string;
	assets: GalleryAsset[];
	attributes: {
		[key: string]: string;
	};
};

export type ObjectModel = {
	name: string;
	image: string;
	type: ObjectModelType;
	assets: GalleryAsset[];
	data?: NFT;
	attributes?: {
		[key: string]: string;
	};
	planeAttributes?: {
		[key: string]: string;
	};
	rotation?: MapDirection;
};
