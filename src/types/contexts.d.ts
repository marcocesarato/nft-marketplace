import {TGenericObject} from "./globals";

export type TGlobalContext = {
	config: TGenericObject;
	setConfig: (payload: TGenericObject) => void;
	removeConfig: (payload: TGenericObject) => void;
	isMenuOpen: boolean;
	onToggleMenu: () => void;
};
