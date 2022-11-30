import Moralis from "moralis";

import {GenericObject} from "@app/types";
import {normalizeItem} from "@utils/converters";

export async function startMoralis() {
	if (!global.moralisIsStarted) {
		await Moralis.start({apiKey: process.env.MORALIS_API_KEY});
		global.moralisIsStarted = true;
	}
}

export async function getWalletNFTs(
	chain: number | string,
	address: string,
	{token_id = null, ...options}: GenericObject = {},
) {
	await startMoralis();
	const result = await Moralis.EvmApi.nft.getWalletNFTs({
		chain: chain,
		address: address,
		...options,
	});
	const data = result.raw.result ?? [];
	const dataParsed = data
		.filter((object) => {
			if (!object?.metadata) return false;
			if (token_id != null) return object.token_id === token_id;
			return true;
		})
		.map(normalizeItem);
	return await Promise.all(dataParsed);
}

export async function getWalletNFTTransfers(
	chain: number | string,
	address: string,
	options: GenericObject = {},
) {
	await startMoralis();
	const result = await Moralis.EvmApi.nft.getWalletNFTTransfers({
		chain: chain,
		address: address,
		...options,
	});
	return result.raw.result ?? [];
}

export async function uploadFiles(
	abi: {path: string; content: string}[],
): Promise<{path: string}[]> {
	await startMoralis();
	const response = await Moralis.EvmApi.ipfs.uploadFolder({
		abi,
	});
	return response.result;
}
