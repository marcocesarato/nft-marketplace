import {Chain} from "wagmi";

import {GenericObject, TokenItem} from "@app/types";
import {ChainId} from "@configs/chain";

import {deepMerge, isString} from "./objects";
import {resolveIPFSUrl} from "./url";

export function chainHex(chain: Chain | null | undefined): string {
	return `0x${(chain?.id || ChainId).toString(16)}`;
}

export const clone = (obj: any): any => {
	return JSON.parse(
		JSON.stringify(obj, (_key, value) => (value instanceof Set ? [...value] : value)),
	);
};

export const convertToPositionAttributes = (
	attributes: string,
): {x: number; y: number; z?: number} => {
	const [x, y, z] = attributes.split(" ").map((value) => parseFloat(value));
	return {x, y, z};
};

export const convertStringToAttributes = (attributes: string): GenericObject => {
	const regex = /^([-]?\d+\s){2,}$/;
	const result: GenericObject = {};
	const attributesArray = attributes.split(";");
	attributesArray.forEach((attribute) => {
		// eslint-disable-next-line prefer-const
		let [key, value] = attribute.split(":");
		if (key && value) {
			key = key.replace("-map-map", "-map");
			result[key] = String(value).trim();
			if (regex.exec(result[key] + " ") !== null) {
				result[key] = convertToPositionAttributes(result[key]);
			}
		}
	});
	return result;
};

export const convertAllStringToAttributes = (
	attributes: GenericObject,
	overwrite: GenericObject = {},
) => {
	const newAttributes: GenericObject = {};
	Object.keys(attributes).forEach((key) => {
		const value = attributes[key];
		if (typeof value === "string") {
			if (value.includes(";") || value.includes(":")) {
				newAttributes[key] = convertStringToAttributes(value);
				return;
			}
		}
		newAttributes[key] = value;
	});
	return deepMerge(newAttributes, overwrite);
};

export function camelToUnderscore(key: string): string {
	return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

export function objectCamelToUnderscore(
	obj: GenericObject,
	recursive: boolean = false,
): GenericObject {
	for (const oldName in obj) {
		const newName = camelToUnderscore(oldName);
		if (newName !== oldName) {
			if (obj.hasOwnProperty(oldName)) {
				obj[newName] = obj[oldName];
				delete obj[oldName];
			}
		}
		if (recursive && typeof obj[newName] == "object") {
			obj[newName] = objectCamelToUnderscore(obj[newName]);
		}
	}
	return obj;
}

export const normalizeItem = async (object: GenericObject) => {
	let metadata = object.metadata;
	delete object.metadata;
	if (metadata && isString(metadata)) {
		try {
			metadata = JSON.parse(metadata);
		} catch (e) {
			console.error(e);
		}
	}
	if (typeof metadata === "object") {
		if (metadata["image"]) metadata["image"] = resolveIPFSUrl(metadata["image"]);
		if (metadata["thumbnail"]) metadata["thumbnail"] = resolveIPFSUrl(metadata["thumbnail"]);
	}
	return {...object, ...metadata};
};

export const toTokenItem = (object?: any | null): TokenItem => {
	return (object ?? {}) as TokenItem;
};

export const toTokenItems = (objects?: any[] | null): TokenItem[] => {
	return (objects as TokenItem[]) ?? [];
};
