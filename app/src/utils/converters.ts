import {formatEther} from "@ethersproject/units";
import type {BigNumberish} from "ethers";
import {Chain} from "wagmi";

import {GenericObject} from "@app/types";

import {deepMerge} from "./objects";

export function chainHex(chain: Chain): string {
	return `0x${chain.id.toString(16)}`;
}

export const convertEtherToPrice = (ether: BigNumberish, etherPrice: number): string =>
	((etherPrice ?? 0) * parseFloat(formatEther(ether ?? 0))).toFixed(2);

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
	const newAttributes = {};
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
