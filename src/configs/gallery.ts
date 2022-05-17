import type {ObjectModel, TextureAsset} from "@app/types";
import {ObjectModelType} from "@app/types/enums";

export const textures: TextureAsset[] = [
	{
		name: "Brick",
		image: "https://www.imgonline.com.ua/examples/texture-ground-tile-original.jpg",
		attributes: {
			material: "src: #brick; repeat: repeat;",
		},
	},
	{
		name: "Brick 2",
		image: "https://www.imgonline.com.ua/examples/texture-ground-tile-original.jpg",
		attributes: {
			material: "src: #brick2; repeat: repeat;",
		},
	},
	{
		name: "Brick 3",
		image: "https://www.imgonline.com.ua/examples/texture-ground-tile-original.jpg",
		attributes: {
			material: "src: #brick3; repeat: repeat;",
		},
	},
	{
		name: "Brick 4",
		image: "https://www.imgonline.com.ua/examples/texture-ground-tile-original.jpg",
		attributes: {
			material: "src: #brick4; repeat: repeat;",
		},
	},
];

export const objectsModels: ObjectModel[] = [
	{
		name: "Sofa",
		type: ObjectModelType.Object,
		image: "https://www.imgonline.com.ua/examples/texture-ground-tile-original.jpg",
		attributes: {
			src: "src: #sofa-obj;",
			mtl: "src: #sofa-mtl;",
			scale: "2 2 2",
			shadow: "receive:true;cast:true",
		},
		planeAttributes: {
			position: "0 -0.2 0",
		},
	},
];
