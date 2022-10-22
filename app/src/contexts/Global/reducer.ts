import {TGlobalContext} from "@app/types";
import {deepMerge} from "@utils/objects";

const reducer = (state: TGlobalContext, action: {type: string; payload?: any}) => {
	switch (action.type) {
		case "ADD_CONFIG":
			return {
				config: deepMerge(state.config, action.payload),
			};
		case "REMOVE_CONFIG":
			return {
				config: Object.keys(state.config)
					.filter((key) => key !== action.payload)
					.reduce(
						(newConfig, currKey) => (newConfig[currKey] = state.config[currKey]),
						{},
					),
			};
		default:
			return state;
	}
};

export default reducer;
