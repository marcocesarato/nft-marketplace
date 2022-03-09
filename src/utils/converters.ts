import {formatEther} from "@ethersproject/units";

export const convertEtherToPrice = (ether, etherPrice) =>
	((etherPrice ?? 0) * parseFloat(formatEther(ether ?? 0))).toFixed(2);
