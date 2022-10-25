import type {TGlobalContext} from "@app/types";

const initialState: TGlobalContext = {
	config: {
		username: "",
		symbol: "",
		isOpenSidebar: false,
	},
	data: {
		userNFTs: [],
		userTransfersERC20: [],
		accountsNFTs: {},
		accountsTransfersERC20: {},
	},
	mergeData: () => {},
	setConfig: () => {},
	removeConfig: () => {},
	isMenuOpen: false,
	onToggleMenu: () => {},
};

export default initialState;
