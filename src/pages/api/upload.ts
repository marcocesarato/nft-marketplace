import fs from "fs";
//import {CID, create as createIpfsClient} from "ipfs-http-client";
import mime from "mime-types";
import type {File} from "multiparty";
import type {NextApiResponse} from "next";
import nextConnect from "next-connect";
import {File as FileStore, NFTStorage} from "nft.storage";
import path from "path";

import type {NextApiRequestFiles} from "@app/types";

import middleware from "./middleware";

const handler = nextConnect<NextApiRequestFiles, NextApiResponse>()
	.use(middleware)
	.post(async function handlePost({body, files}, response) {
		try {
			const metadaUrl = await storeToIPFS(files.file[0], body.name[0], body.description[0]);
			return response.status(200).json({
				url: metadaUrl,
			});
		} catch (error) {
			console.error("Error uploading file: ", error);
		}
	});

/*const syncWait = (ms) => {
	return new Promise((resolve, _reject) => {
		setTimeout(() => {
			resolve(ms);
		}, ms);
	});
};

const fetchData = async ({fromClient, cid, retries = 3, retryWait = 500}) => {
	try {
		return await fromClient.cat(cid);
	} catch (e) {
		if (e.message.match("dag node is a directory")) {
			console.info(`Skipping file: File is a directory`);
		} else if (retries > 0) {
			console.info(`Failed to retrieve file: Retrying...`);
			await syncWait(10000);
			return await fetchData({
				fromClient,
				cid,
				retries: retries - 1,
				retryWait,
			});
		} else {
			console.warn(`Failed to retrieve file: ${e.message}`);
			throw new Error("Max retries reached.");
		}
	}
};*/

async function storeToIPFS(data: File, name: string, description: string) {
	// Upload to IPFS
	const content = await fs.promises.readFile(data.path);
	const type = mime.lookup(data.path);
	const image = new FileStore([content], path.basename(data.path), {type});

	const nftstorage = new NFTStorage({token: process.env.IPFS_API_KEY});
	const result = await nftstorage.store({
		image,
		name,
		description,
	});

	// Sync CID with The Graph IPFS node for the indexing
	/*const sourcePath = result.url.replace("/ipfs/", "");
	const cid = CID.parse(result.ipnft);

	const fromUrl = "https://gateway.ipfs.io/ipfs/api/v0";
	const fromClient = createIpfsClient(fromUrl as any);

	const toURL = "https://api.thegraph.com/ipfs/api/v0";
	const toClient = createIpfsClient(toURL as any);

	//console.log(`From client isOnline: ${await fromClient.isOnline()}`);
	//console.log(`To client isOnline: ${await toClient.isOnline()}`);

	let syncData: any;
	try {
		syncData = await fetchData({
			fromClient,
			cid: sourcePath,
		});
	} catch (e) {
		console.warn(`Failed to retrieve files: ${e.message}`);
		return result.url;
	}

	if (!syncData) {
		console.warn(`Failed to retrieve files: No data`);
		return result.url;
	}

	// Upload file
	let targetFile: any;
	try {
		targetFile = await toClient.add(syncData);
	} catch (e) {
		console.error(`Failed to upload and sync file: ${e.message}`);
	}
	// Verify integrity before and after
	if (!cid.equals(targetFile?.cid)) {
		console.error(
			`Failed to sync file: Uploaded file cid differs: ${cid} != ${targetFile?.cid}`,
		);
	}*/
	return result.url;
}

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
