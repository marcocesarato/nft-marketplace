import fs from "fs";
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
				url: metadaUrl.url,
			});
		} catch (error) {
			console.error("Error uploading file: ", error);
		}
	});

async function storeToIPFS(data: File, name: string, description: string) {
	const content = await fs.promises.readFile(data.path);
	const type = mime.lookup(data.path);
	const image = new FileStore([content], path.basename(data.path), {type});

	const nftstorage = new NFTStorage({token: process.env.IPFS_API_KEY});
	return await nftstorage.store({
		image,
		name,
		description,
	});
}

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
