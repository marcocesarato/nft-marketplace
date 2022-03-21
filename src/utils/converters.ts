import {formatEther} from "@ethersproject/units";
import type {BigNumberish} from "ethers";

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
		};
	};
	if (Array.isArray(items)) {
		return items.map(mergeMetadata);
	}
	return mergeMetadata(items);
};
