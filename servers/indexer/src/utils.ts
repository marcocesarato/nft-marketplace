import {BigNumberish, ethers} from "ethers";
import {getAddresses, ChainId} from "@/config";

export function resolveIPFSLink(uri: string | null | undefined): string | null | undefined {
	return uri?.replace("ipfs://", "https://ipfs.io/ipfs/") || null;
}

export function formatUnits(value: BigNumberish, unitName: BigNumberish = 18): number {
	// formatUnits will always add a trailing 0, remove this as we want to return "1" instead of "1.0"
	const result = ethers.utils.formatUnits(value, unitName);
	const splitResult = result.split(".");
	if (splitResult[1] === "0") {
		return parseFloat(splitResult[0]);
	}

	return parseFloat(result);
}

export function convertToItem(value: ContractItem): Item {
	const {MarketAddress} = getAddresses();
	return {
		network_id: ChainId,
		token_id: value.tokenId,
		token_address: MarketAddress,
		creator: value.creator,
		seller: value.seller,
		owner_of: value.owner,
		price: value.price,
		sold: value.sold,
	};
}
