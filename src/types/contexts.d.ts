import {GenericObject} from "@app/types";

export type TGlobalContext = {
	config: GenericObject;
	addConfig: (payload: GenericObject) => void;
	removeConfig: (payload: GenericObject) => void;
};
