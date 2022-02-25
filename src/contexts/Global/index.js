import {createContext, useReducer, useContext} from "react";

import reducer from "./reducer";
import initialState from "./initialState";

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
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

export const useConfig = () => {
	const {config, addConfig, removeConfig} = useGlobalContext();
	return {...config, addConfig, removeConfig};
};

export default useGlobalContext;
