import {createContext, useContext, useReducer} from "react";
import {useDisclosure} from "@chakra-ui/react";

import type {GenericObject, TGlobalContext} from "@app/types";

import initialState from "./initialState";
import reducer from "./reducer";

export const GlobalContext = createContext<TGlobalContext>(initialState);

export const GlobalProvider = ({children}): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const {isOpen: isMenuOpen, onToggle: onToggleMenu} = useDisclosure();

	function setConfig(item) {
		dispatch({
			type: "ADD_CONFIG",
			payload: item,
		});
	}
	function removeConfig(item) {
		dispatch({
			type: "ADD_CONFIG",
			payload: item,
		});
	}
	function mergeData(item) {
		dispatch({
			type: "MERGE_DATA",
			payload: item,
		});
	}

	const globalState = {
		...state,
		mergeData,
		setConfig,
		removeConfig,
		isMenuOpen,
		onToggleMenu,
	};

	return <GlobalContext.Provider value={globalState}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (context === undefined) {
		throw new Error("useGlobalContext must be used within a GlobalProvider");
	}
	return context;
};

export const useConfig = (): GenericObject => {
	const {config, setConfig, removeConfig} = useGlobalContext();
	return {...config, setConfig, removeConfig};
};

export const useData = (): GenericObject => {
	const {data, mergeData} = useGlobalContext();
	return {...data, mergeData};
};

export const useMenu = () => {
	const {isMenuOpen, onToggleMenu} = useGlobalContext();
	return {isMenuOpen, onToggleMenu};
};

export default useGlobalContext;
