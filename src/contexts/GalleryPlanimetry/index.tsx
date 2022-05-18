import {createContext, useCallback, useContext, useEffect, useState} from "react";

import type {
	PlanimetryBlock,
	PlanimetryMap,
	TextureAsset,
	TGalleryPlanimetryContext,
} from "@app/types";
import {PlanimetryBlockType} from "@app/types/enums";
import {getInsideWallFloor, isBlockInsideWalls} from "@utils/planimetry";

import initialState from "./initialState";

export const GalleryPlanimetryContext = createContext<TGalleryPlanimetryContext>(initialState);

export const GalleryPlanimetryProvider = ({children}): JSX.Element => {
	const [mode, setMode] = useState(initialState.mode);
	const [selected, setSelected] = useState<PlanimetryBlock | null>();
	const [planimetry, setPlanimetry] = useState<PlanimetryMap>(initialState.planimetry);
	const [mapSize, setMapSize] = useState(initialState.size);
	const [color, setColor] = useState(initialState.color);
	const [texture, setTexture] = useState<TextureAsset>(initialState.texture);

	const setBlock = useCallback(
		(id: number, value: PlanimetryBlock) => {
			const map = {...planimetry, blocks: {...planimetry.blocks, [id]: value}};
			setPlanimetry(map);
		},
		[planimetry],
	);

	const setSpawn = useCallback(
		(id: number) => {
			const map = {...planimetry};
			map.spawn = id;
			setPlanimetry(map);
		},
		[planimetry],
	);

	const clearMap = useCallback(() => {
		const size = mapSize || initialState.size;
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
				type: PlanimetryBlockType.Floor,
			};
		}
		setPlanimetry(map);
	}, [mapSize]);

	useEffect(() => {
		clearMap();
	}, [mapSize, clearMap]);

	// Auto spawn positioning
	useEffect(() => {
		if (planimetry && planimetry.blocks && planimetry.blocks.length > 0) {
			let position = planimetry.spawn;
			if (planimetry && planimetry.spawn !== -1) {
				if (!isBlockInsideWalls(position, planimetry)) {
					position = -1;
					setSpawn(-1);
				}
			}
			const insideFloor = getInsideWallFloor(planimetry);
			const arrayFloor: number[] = Array.from(insideFloor);
			if (arrayFloor.length > 0 && position === -1) {
				setSpawn(arrayFloor[0]);
			}
		}
	}, [planimetry, setSpawn]);

	const globalState = {
		mode: mode,
		selected: selected,
		planimetry: planimetry,
		size: mapSize,
		color: color,
		texture: texture,
		clearMap: clearMap,
		setPlanimetry: setPlanimetry,
		onSelect: setSelected,
		onChangeBlock: setBlock,
		onChangePlanimetry: setPlanimetry,
		onChangeMapSize: setMapSize,
		onChangeMode: setMode,
		onChangeSpawn: setSpawn,
		onChangeColor: setColor,
		onChangeTexture: setTexture,
	};

	return (
		<GalleryPlanimetryContext.Provider value={globalState}>
			{children}
		</GalleryPlanimetryContext.Provider>
	);
};

export const useGalleryPlanimetry = () => {
	const context = useContext(GalleryPlanimetryContext);
	if (context === undefined) {
		throw new Error(
			"useGalleryPlanimetryContext must be used within a GalleryPlanimetryProvider",
		);
	}
	return context;
};

export default useGalleryPlanimetry;
