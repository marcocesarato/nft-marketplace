import {createContext, useContext, useReducer} from "react";

import {TGenericObject, TGlobalContext} from "@app/types";

import initialState from "./initialState";
import reducer from "./reducer";

export const GlobalContext = createContext<TGlobalContext>(initialState);

export const GlobalProvider = ({children}): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initialState);

	function addConfig(item) {
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

	return (
		<GlobalContext.Provider value={{...state, addConfig, removeConfig}}>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (context === undefined) {
		throw new Error("useGlobalContext must be used within a GlobalProvider");
	}
	return context;
};

export const useConfig = (): TGenericObject => {
	const {config, addConfig, removeConfig} = useGlobalContext();
	return {...config, addConfig, removeConfig};
};

export default useGlobalContext;
