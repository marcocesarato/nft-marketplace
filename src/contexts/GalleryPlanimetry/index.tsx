import {createContext, useCallback, useContext, useState} from "react";

import type {PlanimetryBlock, PlanimetryMap, TGalleryPlanimetryContext} from "@app/types";
import {PlanimetryBlockType} from "@app/types/enums";

import initialState from "./initialState";

export const GalleryPlanimetryContext = createContext<TGalleryPlanimetryContext>(initialState);

export const GalleryPlanimetryProvider = ({children}): JSX.Element => {
	const [mode, setMode] = useState(initialState.mode);
	const [selected, setSelected] = useState<PlanimetryBlock | null>();
	const [planimetry, setPlanimetry] = useState<PlanimetryMap>(); // TODO: get from user data
	const [mapSize, setMapSize] = useState(initialState.size);
	const [color, setColor] = useState(initialState.color);
	const [texture, setTexture] = useState(initialState.texture);

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
