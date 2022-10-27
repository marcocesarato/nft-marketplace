import {EvmChain} from "@moralisweb3/evm-utils";
import Moralis from "moralis";

import {GenericObject} from "@app/types";
import {isString} from "@utils/objects";
import {resolveIPFSUrl} from "@utils/url";

let isStarted = false;
async function start() {
	if (!isStarted) {
		await Moralis.start({apiKey: process.env.MORALIS_API_KEY});
		isStarted = true;
	}
}

const resultNFTsMap = async (object: GenericObject) => {
	let metadata = object.metadata;
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
	return {...object, ...metadata, metadata};
};

export async function getWalletNFTs(
	chain: number | `${number}`,
	address: string,
	{token_id = null, ...options}: GenericObject = {},
) {
	await start();
	const result = await Moralis.EvmApi.nft.getWalletNFTs({
		chain: EvmChain.create(chain),
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
		.map(resultNFTsMap);
	return await Promise.all(dataParsed);
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
