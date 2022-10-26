import type {TGlobalContext} from "@app/types";

const initialState: TGlobalContext = {
	config: {
		username: "",
		symbol: "",
		isOpenSidebar: false,
	},
	data: {},
	mergeData: () => {},
	setConfig: () => {},
	removeConfig: () => {},
	isMenuOpen: false,
	onToggleMenu: () => {},
};

export default initialState;
