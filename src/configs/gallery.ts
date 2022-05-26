import {GalleryAssetTypesEnum, ObjectModelTypeEnum} from "@app/enums";
import type {ObjectModel, TextureAsset} from "@app/types";

export const MinMapSize = 10;
export const MaxMapSize = 30;

export const WallSize = 3;
export const WallHeight = 6;
export const CameraHeight = 1.6;

export const defaultTextureAttributes = {
	"color": "#ffffff",
	"material":
		"repeat: 4 4;" +
		"normal-map: #wall-normal;" +
		"normal-texture-repeat: 4 4;" +
		"normal-scale: 4 4;" +
		"roughness-map: #wall-roughness;",
	"segments-height": "2",
	"segments-width": "2",
	"segments-depth": "2",
};

export const textures: TextureAsset[] = [
	{
		name: "textures.concrete",
		image: "/assets/textures/default-wall/wall.jpg",
		assets: [
			{
				id: "wall",
				src: "/assets/textures/default-wall/wall.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "wall-normal",
				src: "/assets/textures/default-wall/wall_normal.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "wall-roughness",
				src: "/assets/textures/default-wall/wall_roughness.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
		],
		attributes: {
			...defaultTextureAttributes,
			"material":
				"src: #wall;" +
				"repeat: 4 4;" +
				"normal-map: #wall-normal;" +
				"normal-texture-repeat: 4 4;" +
				"normal-scale: 4 4;" +
				"roughness-map: #wall-roughness;",
		},
	},
	{
		name: "textures.terrazzo",
		image: "/assets/textures/terrazzo/terrazzo.jpg",
		assets: [
			{
				id: "terrazzo",
				src: "/assets/textures/terrazzo/terrazzo.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "terrazzo-normal",
				src: "/assets/textures/terrazzo/terrazzo_normal.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "terrazzo-roughness",
				src: "/assets/textures/terrazzo/terrazzo_roughness.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
		],
		attributes: {
			...defaultTextureAttributes,
			"material":
				"src: #terrazzo;" +
				"repeat: 1 1;" +
				"normal-map: #terrazzo-normal;" +
				"normal-texture-repeat: 1 1;" +
				"normal-scale: 1 1;" +
				"roughness-map: #terrazzo-roughness;",
		},
	},
	{
		name: "textures.ceiling",
		image: "/assets/textures/ceiling/ceiling.jpg",
		assets: [
			{
				id: "ceiling",
				src: "/assets/textures/ceiling/ceiling.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "ceiling-normal",
				src: "/assets/textures/ceiling/ceiling_normal.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "ceiling-roughness",
				src: "/assets/textures/ceiling/ceiling_roughness.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "ceiling-ao",
				src: "/assets/textures/ceiling/ceiling_ao.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "ceiling-height",
				src: "/assets/textures/ceiling/ceiling_height.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
		],
		attributes: {
			...defaultTextureAttributes,
			"material":
				"src: #ceiling;" +
				"repeat: 1 1;" +
				"normal-map: #ceiling-normal;" +
				"normal-texture-repeat: 1 1;" +
				"normal-scale: 1 1;" +
				"roughness-map: #ceiling-roughness;" +
				"metalness-map: #ceiling-metallic;",
		},
	},
	{
		name: "textures.rocks",
		image: "/assets/textures/rocks/rocks.jpg",
		assets: [
			{
				id: "rocks",
				src: "/assets/textures/rocks/rocks.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "rocks-normal",
				src: "/assets/textures/rocks/rocks_normal.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "rocks-roughness",
				src: "/assets/textures/rocks/rocks_roughness.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "rocks-ao",
				src: "/assets/textures/rocks/rocks_ao.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "rocks-height",
				src: "/assets/textures/rocks/rocks_height.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
		],
		attributes: {
			...defaultTextureAttributes,
			"material":
				"src: #rocks;" +
				"repeat: 1 1;" +
				"normal-map: #rocks-normal;" +
				"normal-texture-repeat: 1 1;" +
				"normal-scale: 2 2;" +
				"roughness-map: #rocks-roughness;" +
				"ambient-occlusion-map: #rocks-ao;",
			"segments-height": "3",
			"segments-depth": "3",
		},
	},
	{
		name: "textures.bricks",
		image: "/assets/textures/bricks/bricks.jpg",
		assets: [
			{
				id: "bricks",
				src: "/assets/textures/bricks/bricks.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "bricks-normal",
				src: "/assets/textures/bricks/bricks_normal.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "bricks-roughness",
				src: "/assets/textures/bricks/bricks_roughness.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "bricks-ao",
				src: "/assets/textures/bricks/bricks_ao.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
		],
		attributes: {
			...defaultTextureAttributes,
			"material":
				"src: #bricks;" +
				"repeat: 1 1;" +
				"normal-map: #bricks-normal;" +
				"normal-texture-repeat: 1 1;" +
				"normal-scale: 4 4;" +
				"roughness-map: #bricks-roughness;" +
				"ambient-occlusion-map: #bricks-ao;",
		},
	},
	{
		name: "textures.woodBricks",
		image: "/assets/textures/wood-bricks/wood.jpg",
		assets: [
			{
				id: "wood-bricks",
				src: "/assets/textures/wood-bricks/wood.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "wood-bricks-normal",
				src: "/assets/textures/wood-bricks/wood_normal.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "wood-bricks-roughness",
				src: "/assets/textures/wood-bricks/wood_roughness.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "wood-bricks-ao",
				src: "/assets/textures/wood-bricks/wood_ao.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "wood-bricks-height",
				src: "/assets/textures/wood-bricks/wood_height.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
		],
		attributes: {
			...defaultTextureAttributes,
			"material":
				"src: #wood-bricks;" +
				"repeat: 2 2;" +
				"normal-map: #wood-bricks-normal;" +
				"normal-texture-repeat: 2 2;" +
				"normal-scale: 6 6;" +
				"roughness-map: #wood-bricks-roughness;" +
				"ambient-occlusion-map: #wood-bricks-ao;",
		},
	},
	{
		name: "textures.scifi",
		image: "/assets/textures/scifi/scifi.jpg",
		assets: [
			{
				id: "scifi",
				src: "/assets/textures/scifi/scifi.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "scifi-normal",
				src: "/assets/textures/scifi/scifi_normal.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "scifi-roughness",
				src: "/assets/textures/scifi/scifi_roughness.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "scifi-ao",
				src: "/assets/textures/scifi/scifi_ao.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "scifi-height",
				src: "/assets/textures/scifi/scifi_height.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
		],
		attributes: {
			...defaultTextureAttributes,
			"material":
				"src: #scifi;" +
				"repeat: 1 1;" +
				"normal-map: #scifi-normal;" +
				"normal-texture-repeat: 1 1;" +
				"normal-scale: 1 1;" +
				"roughness-map: #scifi-roughness;" +
				"metalness-map: #scifi-metallic;",
		},
	},
	{
		name: "textures.parquet",
		image: "/assets/textures/parquet/parquet.jpg",
		assets: [
			{
				id: "parquet",
				src: "/assets/textures/parquet/parquet.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "parquet-normal",
				src: "/assets/textures/parquet/parquet_normal.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
			{
				id: "parquet-roughness",
				src: "/assets/textures/parquet/parquet_roughness.jpg",
				type: GalleryAssetTypesEnum.Image,
			},
		],
		attributes: {
			...defaultTextureAttributes,
			"material":
				"src: #parquet;" +
				"repeat: 1 1;" +
				"normal-map: #parquet-normal;" +
				"normal-texture-repeat: 1 1;" +
				"normal-scale: 1 1;" +
				"roughness-map: #parquet-roughness;",
		},
	},
];

export const defaultWallTexture = textures[0];
export const defaultFloorTexture = textures[1];
export const defaultCeilingTexture = textures[2];

export const objectsModels: ObjectModel[] = [
	{
		name: "Sofa",
		type: ObjectModelTypeEnum.Object,
		image: "/assets/objects/sofa/sofa.jpg",
		assets: [
			{
				id: "sofa-obj",
				src: "/assets/objects/sofa/sofa.obj",
				type: GalleryAssetTypesEnum.Item,
			},
			{
				id: "sofa-mtl",
				src: "/assets/objects/sofa/sofa.mtl",
				type: GalleryAssetTypesEnum.Item,
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
];
