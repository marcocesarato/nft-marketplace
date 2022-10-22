import type {TGlobalContext} from "@app/types";

const initialState: TGlobalContext = {
	config: {
		username: "",
		nativeToken: {
			name: "MATIC",
			symbol: "MATIC",
			decimals: 5,
		},
		isOpenSidebar: false,
	},
	setConfig: () => {},
	removeConfig: () => {},
	isMenuOpen: false,
	onToggleMenu: () => {},
};

export default initialState;
