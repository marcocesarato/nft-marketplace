import {createContext, useCallback, useContext, useMemo, useReducer, useState} from "react";

import {GalleryActionType, GalleryBuilderMode} from "@app/enums";
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
	const [schema, dispatch] = useReducer(reducer, initialState.schema);
	const [mode, setMode] = useState<GalleryBuilderMode>(initialState.mode);
	const [selected, setSelected] = useState<PlanimetryBlock | null>();
	const [color, setColor] = useState(initialState.color);
	const [texture, setTexture] = useState<TextureAsset>(initialState.texture);
	const [mouseDown, setMouseDown] = useState(false);
	const [mouseRightDown, setMouseRightDown] = useState(false);

	const onSelect = useCallback(
		(block: PlanimetryBlock) => {
			if (block?.id !== schema.getSpawn()) {
				setSelected(block);
			}
		},
		[schema],
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

	const setSchema = useCallback((map: PlanimetryMap) => {
		dispatch({
			type: GalleryActionType.SetData,
			payload: map,
		});
	}, []);

	const setBlock = useCallback(
		(id: number, value: PlanimetryBlock) => {
			dispatch({
				type: GalleryActionType.SetBlock,
				payload: {id, value},
				callback: updateSelected,
			});
		},
		[updateSelected],
	);

	const setBlockMetadata = useCallback(
		(id: number, value: GenericObject) => {
			dispatch({
				type: GalleryActionType.SetBlockMetadata,
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
				type: GalleryActionType.SetSpawn,
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
				type: GalleryActionType.SetSize,
				payload: size,
				callback: cleanSelected,
			});
		},
		[cleanSelected],
	);

	const resetMap = useCallback(() => {
		dispatch({
			type: GalleryActionType.ResetMap,
			callback: cleanSelected,
		});
	}, [cleanSelected]);

	const schemaMap = schema.getMap();
	const globalState = useMemo(
		() => ({
			schema: schema,
			mode: mode,
			selected: selected,
			size: schemaMap.width || initialState.size,
			color: color,
			texture: texture,
			resetMap: resetMap,
			setSchema: setSchema,
			onSelect: onSelect,
			mouseDown: mouseDown,
			mouseRightDown: mouseRightDown,
			onMouseDown: setMouseDown,
			onMouseRightDown: setMouseRightDown,
			onChangeBlock: setBlock,
			onChangeBlockMetadata: setBlockMetadata,
			onChangePlanimetry: setSchema,
			onChangeMapSize: setMapSize,
			onChangeMode: setMode,
			onChangeSpawn: setSpawn,
			onChangeColor: setColor,
			onChangeTexture: setTexture,
		}),
		[
			color,
			mode,
			mouseDown,
			mouseRightDown,
			onSelect,
			schema,
			schemaMap.width,
			resetMap,
			selected,
			setBlock,
			setBlockMetadata,
			setMapSize,
			setSchema,
			setSpawn,
			texture,
		],
	);

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
