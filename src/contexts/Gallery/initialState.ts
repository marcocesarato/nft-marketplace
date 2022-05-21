import {PlanimetryBlockTypeEnum} from "@app/enums";
import type {PlanimetryMap, TGalleryContext} from "@app/types";
import {PlanimetrySchema} from "@utils/planimetry";

export const minMapSize = 10;

export function createInitialSchema(mapSize: number): PlanimetrySchema {
	const size = Math.max(mapSize || minMapSize, minMapSize);
	const map: PlanimetryMap = {
		height: size,
		width: size,
		blocks: [],
	};
	for (let i = 0; i < size * size; i++) {
		map.blocks[i] = {
			id: i,
			texture: null,
			color: null,
			type: PlanimetryBlockTypeEnum.Floor,
		};
	}
	return new PlanimetrySchema(map);
}

export function createInitialState(): TGalleryContext {
	return {
		schema: createInitialSchema(minMapSize),
		size: minMapSize,
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
}
