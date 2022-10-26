import fs from "fs";
import mime from "mime-types";
import type {File} from "multiparty";
import type {NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";
import nextConnect from "next-connect";
import path from "path";

import type {NextApiRequestFiles} from "@app/types";
import {uploadFiles} from "@services/api";

import middleware from "./middleware";

const imageThumb = require("image-thumbnail");

const handler = nextConnect<NextApiRequestFiles, NextApiResponse>()
	.use(middleware)
	.post(async function handlePost(req, res) {
		const token = await getToken({req});

		if (!token || !token?.user) {
			res.status(401);
			res.end();
		}

		const {body, files} = req;
		try {
			const metadaUrl = await storeToIPFS(files.file[0], body.name[0], body.description[0]);
			return res.status(200).json({
				url: metadaUrl,
			});
		} catch (error) {
			console.error("Error uploading file: ", error);
			res.status(400);
			res.end();
		}
	});

async function storeToIPFS(data: File, name: string, description: string) {
	const fileName = path.basename(data.path);
	const type = mime.lookup(data.path);

	// Image
	const contentBuffer = await fs.promises.readFile(data.path);
	const content = contentBuffer.toString("base64");

	// Image thumbnail
	const thumbContent = await imageThumb(content, {
		width: 350,
		height: 350,
		jpegOptions: {force: true, quality: 80},
		responseType: "base64",
	});

	// Upload
	const images = await uploadFiles([
		{
			path: `images/${fileName}`,
			content: `data:${type};base64,${content}`,
		},
		{
			path: `thumbs/${fileName}`,
			content: `data:${type};base64,${thumbContent}`,
		},
	]);

	const metataJson = {
		image: images[0].path,
		thumbnail: images[1].path,
		name,
		description,
	};
	const metadataContent = Buffer.from(JSON.stringify(metataJson)).toString("base64");
	const metadata = await uploadFiles([
		{
			path: `metadata/${fileName}`,
			content: `data:application/json;base64,${metadataContent}`,
		},
	]);

	console.log(metadata);

	return metadata[0].path;
}

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
