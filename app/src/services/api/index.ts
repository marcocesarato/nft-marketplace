import {EvmChain} from "@moralisweb3/evm-utils";
import Moralis from "moralis";

import {GenericObject} from "@app/types";

let isStarted = false;
async function start() {
	if (!isStarted) {
		await Moralis.start({apiKey: process.env.MORALIS_API_KEY});
		isStarted = true;
	}
}

export async function getWalletNFTs(
	chain: number | `${number}`,
	address: string,
	options: GenericObject = {},
) {
	await start();
	const result = await Moralis.EvmApi.nft.getWalletNFTs({
		chain: EvmChain.create(chain),
		address: address,
		...options,
	});
	return result.raw.result ?? [];
}

export async function getWalletNFTTransfers(
	chain: number | `${number}`,
	address: string,
	options: GenericObject = {},
) {
	await start();
	const result = await Moralis.EvmApi.nft.getWalletNFTTransfers({
		chain: EvmChain.create(chain),
		address: address,
		...options,
	});
	return result.raw.result ?? [];
}

export async function uploadFiles(
	abi: {path: string; content: string}[],
): Promise<{path: string}[]> {
	await start();
	const response = await Moralis.EvmApi.ipfs.uploadFolder({
		abi,
	});
	return response.result;
}
