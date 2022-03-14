import {GenericObject} from "./globals";

export type TGlobalContext = {
	config: GenericObject;
	setConfig: (payload: GenericObject) => void;
	removeConfig: (payload: GenericObject) => void;
	isMenuOpen: boolean;
	onToggleMenu: () => void;
};
