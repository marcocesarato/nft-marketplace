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
	isMenuOpen: false,
	onToggleMenu: () => {},
};

export default initialState;
