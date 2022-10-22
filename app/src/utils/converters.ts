import {formatEther} from "@ethersproject/units";
import type {BigNumberish} from "ethers";

import {GenericObject} from "@app/types";
import {formatUnits} from "@utils/units";

import {deepMerge} from "./objects";

export const convertEtherToPrice = (ether: BigNumberish, etherPrice: number) =>
	((etherPrice ?? 0) * parseFloat(formatEther(ether ?? 0))).toFixed(2);

export const withMetadata = (items) => {
	if (!items) return items;
	const mergeMetadata = (item) => {
		return {
			...item,
			...(item.metadata || {}),
			creator: item.creator?.id || item.owner?.id,
			seller: item.seller?.id,
			owner: item.owner?.id,
			priceFormatted: formatUnits(item.price, "ether"),
		};
	};
	if (Array.isArray(items)) {
		return items.map(mergeMetadata);
	}
	return mergeMetadata(items);
};

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
		const attributesSplit = attributes.split(";");
		let key = attributesSplit[0];
		const value = attributesSplit[1];
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
