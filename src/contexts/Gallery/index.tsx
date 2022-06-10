import {createContext, useCallback, useContext, useReducer, useState} from "react";

import {GalleryActionTypesEnum, GalleryBuilderMode} from "@app/enums";
import type {
	GenericObject,
	PlanimetryBlock,
	PlanimetryMap,
	TextureAsset,
	TGalleryContext,
} from "@app/types";

import {createInitialState} from "./initialState";
import reducer from "./reducer";

const initialState = createInitialState();
export const GalleryPlanimetryContext = createContext<TGalleryContext>(initialState);

export const GalleryProvider = ({children}): JSX.Element => {
	const [planimetry, dispatch] = useReducer(reducer, initialState.schema);
	const [mode, setMode] = useState<GalleryBuilderMode>(initialState.mode);
	const [selected, setSelected] = useState<PlanimetryBlock | null>();
	const [color, setColor] = useState(initialState.color);
	const [texture, setTexture] = useState<TextureAsset>(initialState.texture);

	const onSelect = useCallback(
		(block: PlanimetryBlock) => {
			if (block?.id !== planimetry.getSpawn()) {
				setSelected(block);
			}
		},
		[planimetry],
	);

	const cleanSelected = useCallback(() => {
		setSelected(null);
	}, []);

	const updateSelected = useCallback(
		(block: PlanimetryBlock) => {
			if (block.id === selected?.id) setSelected(block);
		},
		[selected],
	);

	const setPlanimetry = useCallback((map: PlanimetryMap) => {
		dispatch({
			type: GalleryActionTypesEnum.SetData,
			payload: map,
		});
	}, []);

	const setBlock = useCallback(
		(id: number, value: PlanimetryBlock) => {
			dispatch({
				type: GalleryActionTypesEnum.SetBlock,
				payload: {id, value},
				callback: updateSelected,
			});
		},
		[updateSelected],
	);

	const setBlockMetadata = useCallback(
		(id: number, value: GenericObject) => {
			dispatch({
				type: GalleryActionTypesEnum.SetBlockMetadata,
				payload: {
					id,
					value,
				},
				callback: updateSelected,
			});
		},
		[updateSelected],
	);

	const setSpawn = useCallback(
		(id: number) => {
			dispatch({
				type: GalleryActionTypesEnum.SetSpawn,
				payload: id,
			});
			if (selected?.id === id) {
				setSelected(null);
			}
		},
		[selected],
	);

	const setMapSize = useCallback(
		(size: number) => {
			dispatch({
				type: GalleryActionTypesEnum.SetSize,
				payload: size,
				callback: cleanSelected,
			});
		},
		[cleanSelected],
	);

	const resetMap = useCallback(() => {
		dispatch({
			type: GalleryActionTypesEnum.ResetMap,
			callback: cleanSelected,
		});
	}, [cleanSelected]);

	const planimetryMap = planimetry.getMap();
	const globalState = {
		schema: planimetry,
		mode: mode,
		selected: selected,
		size: planimetryMap.width || initialState.size,
		color: color,
		texture: texture,
		resetMap: resetMap,
		setPlanimetry: setPlanimetry,
		onSelect: onSelect,
		onChangeBlock: setBlock,
		onChangeBlockMetadata: setBlockMetadata,
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

export const useGallery = () => {
	const context = useContext(GalleryPlanimetryContext);
	if (context === undefined) {
		throw new Error("useGalleryContext must be used within a GalleryProvider");
	}
	return context;
};

export default useGallery;
