import {NextApiRequest, NextApiResponse} from "next";

import {authSignature} from "@utils/auth";
import {withSessionRoute} from "@utils/session";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	const {message, signature, account} = await req.body;
	try {
		const isAuthenticated = authSignature(message, signature, account);

		if (!isAuthenticated) {
			res.status(500).json({message: "Invalid signature"});
		}

		const result = {isAuthenticated, account: account.toLowerCase()};

		req.session.account = result.account;
		req.session.isAuthenticated = result.isAuthenticated;

		await req.session.save();
		res.json(result);
	} catch (error) {
		res.status(500).json({message: (error as Error).message});
	}
}

export default withSessionRoute(loginRoute);
