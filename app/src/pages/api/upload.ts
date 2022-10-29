import fs from "fs";
import mime from "mime-types";
import type {NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";
import nextConnect from "next-connect";
import path from "path";

import type {GenericObject, NextApiRequestFiles} from "@app/types";
import {SellInput} from "@app/types";
import {uploadFiles} from "@services/api";
import {slug} from "@utils/formatters";

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
			const metadaUrl = await storeToIPFS({
				name: body.name[0],
				description: body.description[0],
				image: files.image[0],
				animation: files.animation?.[0],
				externalUrl: body.externalUrl[0],
			});
			return res.status(200).json({
				url: metadaUrl,
			});
		} catch (error) {
			console.error("Error uploading file: ", error);
			res.status(400);
			res.end();
		}
	});

async function storeToIPFS({name, description, image, animation, externalUrl}: SellInput) {
	const slugName = slug(name);

	// Image
	const imageFileName = path.basename(image.path);
	const imageType = mime.lookup(image.path);

	const contentBuffer = await fs.promises.readFile(image.path);
	const content = contentBuffer.toString("base64");

	// Image thumbnail
	const thumbContent = await imageThumb(content, {
		width: 350,
		height: 350,
		jpegOptions: {force: true, quality: 80},
		responseType: "base64",
	});

	const files = [
		{
			path: `images/${imageFileName}`,
			content: `data:${imageType};base64,${content}`,
		},
		{
			path: `thumbs/${imageFileName}`,
			content: `data:${imageType};base64,${thumbContent}`,
		},
	];

	if (animation) {
		// Animation
		const animationFileName = path.basename(animation.path);
		const contentBuffer = await fs.promises.readFile(animation.path);
		const content = contentBuffer.toString("base64");
		files.push({
			path: `animations/${animationFileName}`,
			content: content,
		});
	}

	// Upload
	const uploads = await uploadFiles(files);

	const metataJson = {
		image: uploads[0].path,
		thumbnail: uploads[1].path,
		name,
		description,
		animation_url: uploads[2]?.path || undefined,
		external_url: externalUrl || undefined,
	} as GenericObject;

	const metadataContent = Buffer.from(JSON.stringify(metataJson)).toString("base64");
	const metadata = await uploadFiles([
		{
			path: `metadata/${slugName}.json`,
			content: `data:application/json;base64,${metadataContent}`,
		},
	]);

	return metadata[0].path;
}

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
