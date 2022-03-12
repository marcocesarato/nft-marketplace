import {TGenericObject} from "./globals";

export type TGlobalContext = {
	config: TGenericObject;
	addConfig: (payload: TGenericObject) => void;
	removeConfig: (payload: TGenericObject) => void;
};
