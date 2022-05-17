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
	const [planimetry, setPlanimetry] = useState<PlanimetryMap>(); // TODO: get from user data
	const [mapSize, setMapSize] = useState(initialState.size);
	const [color, setColor] = useState(initialState.color);
	const [texture, setTexture] = useState<TextureAsset>(initialState.texture);

	const setBlock = useCallback(
		(id: number, value: PlanimetryBlock) => {
			const map = {...planimetry};
			const blocks: PlanimetryBlock[] = Array.from(planimetry.blocks);
			blocks[id] = {...value};
			map.blocks = new Set(blocks);
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
		const map: PlanimetryMap = {
			height: 20,
			width: 20,
			blocks: new Set(),
		};
		for (let i = 0; i < 20 * mapSize; i++) {
			map.blocks.add({
				id: i,
				texture: null,
				color: null,
				type: PlanimetryBlockType.Floor,
			});
		}
		setPlanimetry(map);
	}, [mapSize]);

	// Map resizing
	useEffect(() => {
		let blocks: PlanimetryBlock[] = [];
		if (planimetry) {
			blocks = Array.from(planimetry.blocks);
		}
		const map: PlanimetryMap = {
			height: mapSize,
			width: mapSize,
			blocks: new Set(),
		};
		for (let i = 0; i < mapSize * mapSize; i++) {
			map.blocks.add(
				blocks[i] || {
					id: i,
					type: PlanimetryBlockType.Floor,
				},
			);
		}
		setPlanimetry(map);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mapSize]);

	// Auto spawn positioning
	useEffect(() => {
		if (planimetry && planimetry.blocks.size > 0) {
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
