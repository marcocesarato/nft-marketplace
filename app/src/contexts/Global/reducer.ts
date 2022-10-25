import {TGlobalContext} from "@app/types";
import {deepMerge} from "@utils/objects";

const reducer = (state: TGlobalContext, action: {type: string; payload?: any}) => {
	switch (action.type) {
		case "ADD_CONFIG":
			return {
				...state,
				config: deepMerge(state.config, action.payload),
			};
		case "REMOVE_CONFIG":
			return {
				...state,
				config: Object.keys(state.config)
					.filter((key) => key !== action.payload)
					.reduce(
						(newConfig, currKey) => (newConfig[currKey] = state.config[currKey]),
						{},
					),
			};
		case "MERGE_DATA":
			return {
				...state,
				data: deepMerge(state.data, action.payload),
			};
		default:
			return state;
	}
};

export default reducer;
