import {formatEther} from "@ethersproject/units";
import type {BigNumberish} from "ethers";

import {formatUnits} from "@utils/units";

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
