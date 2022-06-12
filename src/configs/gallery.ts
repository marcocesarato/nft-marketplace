import {GalleryAssetTypeEnum, ObjectModelTypeEnum} from "@app/enums";
import type {ObjectModel, TextureAsset} from "@app/types";

export const MinMapSize = 10;
export const MaxMapSize = 30;

export const WallSize = 4;
export const WallHeight = 6;
export const CameraHeight = 1.6;

export const DefaultColor = "#FFF";
export const DefaultTextureAttributes = {
	"color": DefaultColor,
	"material":
		`repeat: 1 ${WallHeight};` +
		"normal-map: #wall-normal;" +
		`normal-texture-repeat: 1 ${WallHeight};` +
		`normal-scale: 1 ${WallHeight};` +
		"roughness-map: #wall-roughness;",
	"segments-height": "64",
	"segments-width": "64",
};

export const EnvironmentMaps = {
	"forest":
		"preset: forest; grid: none; ground: hills; groundTexture: noise; shadow: true;playArea: 20; lighting: true;",
	"night":
		"preset: starry; grid: none; ground: hills; groundColor: #663926; groundColor2: #663926; shadow: true; lighting: none;",
};

export const Textures: {[key: string]: TextureAsset} = {
	"concrete": {
		name: "concrete",
		image: "/assets/textures/default-wall/wall.jpg",
		assets: [
			{
				id: "texture-wall",
				src: "/assets/textures/default-wall/wall.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-wall-normal",
				src: "/assets/textures/default-wall/wall_normal.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-wall-roughness",
				src: "/assets/textures/default-wall/wall_roughness.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
		],
		attributes: {
			...DefaultTextureAttributes,
			"material":
				"src: #texture-wall;" +
				`repeat: 1 ${WallHeight};` +
				"normal-map: #texture-wall-normal;" +
				`normal-texture-repeat: 1 ${WallHeight};` +
				`normal-scale: 1 ${WallHeight};` +
				"roughness-map: #texture-wall-roughness;",
		},
	},
	"terrazzo": {
		name: "terrazzo",
		image: "/assets/textures/terrazzo/terrazzo.jpg",
		assets: [
			{
				id: "texture-terrazzo",
				src: "/assets/textures/terrazzo/terrazzo.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-terrazzo-normal",
				src: "/assets/textures/terrazzo/terrazzo_normal.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-terrazzo-roughness",
				src: "/assets/textures/terrazzo/terrazzo_roughness.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
		],
		attributes: {
			...DefaultTextureAttributes,
			"material":
				"src: #texture-terrazzo;" +
				"repeat: 1 1;" +
				"normal-map: #texture-terrazzo-normal;" +
				"normal-texture-repeat: 1 1;" +
				"normal-scale: 1 1;" +
				"roughness-map: #texture-terrazzo-roughness;",
		},
	},
	"ceiling": {
		name: "ceiling",
		image: "/assets/textures/ceiling/ceiling.jpg",
		assets: [
			{
				id: "texture-ceiling",
				src: "/assets/textures/ceiling/ceiling.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-ceiling-normal",
				src: "/assets/textures/ceiling/ceiling_normal.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-ceiling-roughness",
				src: "/assets/textures/ceiling/ceiling_roughness.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-ceiling-ao",
				src: "/assets/textures/ceiling/ceiling_ao.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-ceiling-height",
				src: "/assets/textures/ceiling/ceiling_height.png",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-ceiling-metallic",
				src: "/assets/textures/ceiling/ceiling_metallic.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
		],
		attributes: {
			...DefaultTextureAttributes,
			"material":
				"src: #texture-ceiling;" +
				"repeat: 1 1;" +
				"normal-map: #texture-ceiling-normal;" +
				"normal-texture-repeat: 1 1;" +
				"normal-scale: 1 1;" +
				"roughness-map: #texture-ceiling-roughness;" +
				"metalness-map: #texture-ceiling-metallic;" /* +
				"displacement-map: #texture-ceiling-height;" +
				"displacement-scale: 0.5;",*/,
		},
	},
	"rocks": {
		name: "rocks",
		image: "/assets/textures/rocks/rocks.jpg",
		assets: [
			{
				id: "texture-rocks",
				src: "/assets/textures/rocks/rocks.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-rocks-normal",
				src: "/assets/textures/rocks/rocks_normal.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-rocks-roughness",
				src: "/assets/textures/rocks/rocks_roughness.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-rocks-ao",
				src: "/assets/textures/rocks/rocks_ao.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-rocks-height",
				src: "/assets/textures/rocks/rocks_height.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
		],
		attributes: {
			...DefaultTextureAttributes,
			"material":
				"src: #texture-rocks;" +
				"repeat: 1 1;" +
				"normal-map: #texture-rocks-normal;" +
				"normal-texture-repeat: 1 1;" +
				"normal-scale: 2 2;" +
				"roughness-map: #texture-rocks-roughness;" +
				"ambient-occlusion-map: #texture-rocks-ao;" /* +
				"displacement-map: #texture-rocks-height;" +
				"displacement-scale: 0.5;",*/,
		},
	},
	"bricks": {
		name: "bricks",
		image: "/assets/textures/bricks/bricks.jpg",
		assets: [
			{
				id: "texture-bricks",
				src: "/assets/textures/bricks/bricks.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-bricks-normal",
				src: "/assets/textures/bricks/bricks_normal.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-bricks-roughness",
				src: "/assets/textures/bricks/bricks_roughness.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-bricks-ao",
				src: "/assets/textures/bricks/bricks_ao.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
		],
		attributes: {
			...DefaultTextureAttributes,
			"material":
				"src: #texture-bricks;" +
				"repeat: 1 1;" +
				"normal-map: #texture-bricks-normal;" +
				"normal-texture-repeat: 1 1;" +
				"normal-scale: 1 1;" +
				"roughness-map: #texture-bricks-roughness;" +
				"ambient-occlusion-map: #texture-bricks-ao;",
		},
	},
	"woodBricks": {
		name: "woodBricks",
		image: "/assets/textures/wood-bricks/wood.jpg",
		assets: [
			{
				id: "texture-wood-bricks",
				src: "/assets/textures/wood-bricks/wood.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-wood-bricks-normal",
				src: "/assets/textures/wood-bricks/wood_normal.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-wood-bricks-roughness",
				src: "/assets/textures/wood-bricks/wood_roughness.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-wood-bricks-ao",
				src: "/assets/textures/wood-bricks/wood_ao.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-wood-bricks-height",
				src: "/assets/textures/wood-bricks/wood_height.png",
				type: GalleryAssetTypeEnum.Image,
			},
		],
		attributes: {
			...DefaultTextureAttributes,
			"material":
				"src: #texture-wood-bricks;" +
				"repeat: 2 2;" +
				"normal-map: #texture-wood-bricks-normal;" +
				"normal-texture-repeat: 2 2;" +
				"normal-scale: 4 4;" +
				"roughness-map: #texture-wood-bricks-roughness;" +
				"ambient-occlusion-map: #texture-wood-bricks-ao;" /* +
				"displacement-map: #texture-wood-bricks-height;" +
				"displacement-scale: 0.5;",*/,
		},
	},
	"scifi": {
		name: "scifi",
		image: "/assets/textures/scifi/scifi.jpg",
		assets: [
			{
				id: "texture-scifi",
				src: "/assets/textures/scifi/scifi.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-scifi-normal",
				src: "/assets/textures/scifi/scifi_normal.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-scifi-roughness",
				src: "/assets/textures/scifi/scifi_roughness.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-scifi-ao",
				src: "/assets/textures/scifi/scifi_ao.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-scifi-metallic",
				src: "/assets/textures/scifi/scifi_metallic.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-scifi-height",
				src: "/assets/textures/scifi/scifi_height.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
		],
		attributes: {
			...DefaultTextureAttributes,
			"material":
				"src: #texture-scifi;" +
				"repeat: 1 1;" +
				"normal-map: #texture-scifi-normal;" +
				"normal-texture-repeat: 1 1;" +
				"normal-scale: 1 1;" +
				"roughness-map: #texture-scifi-roughness;" +
				"metalness-map: #texture-scifi-metallic;" /* +
				"displacement-map: #texture-scifi-height;" +
				"displacement-scale: 0.5;",*/,
		},
	},
	"parquet": {
		name: "parquet",
		image: "/assets/textures/parquet/parquet.jpg",
		assets: [
			{
				id: "texture-parquet",
				src: "/assets/textures/parquet/parquet.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-parquet-normal",
				src: "/assets/textures/parquet/parquet_normal.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
			{
				id: "texture-parquet-roughness",
				src: "/assets/textures/parquet/parquet_roughness.jpg",
				type: GalleryAssetTypeEnum.Image,
			},
		],
		attributes: {
			...DefaultTextureAttributes,
			"material":
				"src: #texture-parquet;" +
				"repeat: 1 1;" +
				"normal-map: #texture-parquet-normal;" +
				"normal-texture-repeat: 1 1;" +
				"normal-scale: 1 1;" +
				"roughness-map: #texture-parquet-roughness;",
		},
	},
};

export const ObjectsModels: {[key: string]: ObjectModel} = {
	"sofa": {
		name: "sofa",
		type: ObjectModelTypeEnum.Object,
		image: "/assets/objects/sofa/sofa.jpg",
		assets: [
			{
				id: "sofa-obj",
				src: "/assets/objects/sofa/sofa.obj",
				type: GalleryAssetTypeEnum.Item,
			},
			{
				id: "sofa-mtl",
				src: "/assets/objects/sofa/sofa.mtl",
				type: GalleryAssetTypeEnum.Item,
			},
		],
		attributes: {
			"src": "src: #sofa-obj;",
			"mtl": "src: #sofa-mtl;",
			"scale": "2 2 2",
			"shadow": "receive:true;cast:true",
			"physx-body-from-model": "type:static;",
			"physx-shape-from-model": "type: box;offset:0 1.1 0;",
			"physx-restitution": "1.5",
		},
		planeAttributes: {
			"position": "0 -0.2 0",
			"height": "1",
			"width-scale": "0.5",
			"class": "navmesh-hole",
			"visible": "false",
		},
	},
};

export const DefaultWallTexture = Textures.concrete;
export const DefaultFloorTexture = Textures.terrazzo;
export const DefaultCeilingTexture = Textures.ceiling;
