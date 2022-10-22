import multiparty from "multiparty";
import type {NextApiResponse} from "next";
import nextConnect from "next-connect";

import type {NextApiRequestFiles} from "@app/types";

const middleware = nextConnect<NextApiRequestFiles, NextApiResponse>();

middleware.use(async (req, res, next) => {
	const form = new multiparty.Form();

	await form.parse(req, function (err, fields, files) {
		req.body = fields;
		req.files = files;
		next();
	});
});

export default middleware;
