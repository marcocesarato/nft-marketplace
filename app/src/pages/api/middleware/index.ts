import multiparty from "multiparty";
import type {NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";
import nextConnect from "next-connect";

import type {NextApiRequestFiles} from "@app/types";

const middleware = nextConnect<NextApiRequestFiles, NextApiResponse>();

middleware.use(async (req: NextApiRequestFiles, res: NextApiResponse, next) => {
	const token = await getToken({req});

	if (!token || !token?.isAuthenticated) {
		res.status(401);
		res.end();
	}

	const form = new multiparty.Form();

	await form.parse(req, function (err, fields, files) {
		req.body = fields;
		req.files = files;
		next();
	});
});

export default middleware;
