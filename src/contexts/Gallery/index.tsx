import {createContext, useCallback, useContext, useReducer, useState} from "react";

import {GalleryActionTypesEnum} from "@app/enums";
import type {PlanimetryBlock, PlanimetryMap, TextureAsset, TGalleryContext} from "@app/types";

import {createInitialState} from "./initialState";
import reducer from "./reducer";

const initialState = createInitialState();
export const GalleryPlanimetryContext = createContext<TGalleryContext>(initialState);

export const GalleryProvider = ({children}): JSX.Element => {
	const [planimetry, dispatch] = useReducer(reducer, initialState.schema);
	const [mode, setMode] = useState(initialState.mode);
	const [selected, setSelected] = useState<PlanimetryBlock | null>();
	const [color, setColor] = useState(initialState.color);
	const [texture, setTexture] = useState<TextureAsset>(initialState.texture);

	const setPlanimetry = useCallback((map: PlanimetryMap) => {
		dispatch({
			type: GalleryActionTypesEnum.SetData,
			payload: map,
		});
	}, []);

	const setBlock = useCallback((id: number, value: PlanimetryBlock) => {
		dispatch({
			type: GalleryActionTypesEnum.SetBlock,
			payload: {id, value},
		});
	}, []);

	const setSpawn = useCallback((id: number) => {
		dispatch({
			type: GalleryActionTypesEnum.SetSpawn,
			payload: id,
		});
	}, []);

	const setMapSize = useCallback((size: number) => {
		dispatch({
			type: GalleryActionTypesEnum.SetSize,
			payload: size,
		});
	}, []);

	const clearMap = useCallback(() => {
		dispatch({
			type: GalleryActionTypesEnum.ResetMap,
		});
	}, []);

	const planimetryMap = planimetry.getMap();
	const globalState = {
		schema: planimetry,
		mode: mode,
		selected: selected,
		size: planimetryMap.width || initialState.size,
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

export const useGallery = () => {
	const context = useContext(GalleryPlanimetryContext);
	if (context === undefined) {
		throw new Error("useGalleryContext must be used within a GalleryProvider");
	}
	return context;
};

export default useGallery;
