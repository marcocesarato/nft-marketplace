import {TGlobalContext} from "@app/types";

const initialState: TGlobalContext = {
	config: {
		nativeToken: {
			name: "MATIC",
			symbol: "MATIC",
			decimals: 5,
		},
	},
	addConfig: () => {},
	removeConfig: () => {},
};

export default initialState;
