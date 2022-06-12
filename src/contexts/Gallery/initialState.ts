import {GalleryBuilderModeEnum, PlanimetryBlockTypeEnum} from "@app/enums";
import type {PlanimetryMap, TGalleryContext} from "@app/types";
import {MaxMapSize, MinMapSize} from "@configs/gallery";
import {clone} from "@utils/converters";
import {PlanimetrySchema} from "@utils/planimetry";

export function createInitialSchema(mapSize: number): PlanimetrySchema {
	const size = Math.max(MinMapSize, Math.min(MaxMapSize, mapSize));
	const map: PlanimetryMap = {
		height: size,
		width: size,
		blocks: [],
	};
	for (let i = 0; i < size * size; i++) {
		map.blocks[i] = {
			id: i,
			type: PlanimetryBlockTypeEnum.Floor,
		};
	}
	const schema = new PlanimetrySchema(clone(map));

	// Set all border to wall
	for (let i = 0; i < size * size; i++) {
		if (schema.isMapBorder(i)) {
			map.blocks[i].type = PlanimetryBlockTypeEnum.Wall;
		}
	}
	schema.setMap(map);

	return schema;
}

export function createInitialState(): TGalleryContext {
	return {
		schema: createInitialSchema(MinMapSize),
		size: MinMapSize,
		mode: GalleryBuilderModeEnum.Select,
		selected: null,
		mouseDown: false,
		mouseRightDown: false,
		resetMap: () => {},
		setSchema: () => {},
		onChangeMapSize: () => {},
		onChangeMode: () => {},
		onSelect: () => {},
		onChangeSpawn: () => {},
		onChangeBlock: () => {},
		onChangeColor: () => {},
		onChangeTexture: () => {},
		onChangeBlockMetadata: () => {},
		onMouseDown: () => {},
		onMouseRightDown: () => {},
	};
}
