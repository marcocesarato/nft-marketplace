import {recoverPersonalSignature} from "@metamask/eth-sig-util";
import {ApolloServer} from "apollo-server-micro";
import * as ethUtil from "ethereumjs-util";
import {Base64} from "js-base64";
import {send} from "micro";
import Cors from "micro-cors";

import {connectDatabase} from "@database/connect";
import GraphQLSchema from "@database/graphql/schema";
import User from "@models/User";
import {formatAddress} from "@utils/formatters";

const cors = Cors({
	allowHeaders: [
		"X-Requested-With",
		"Access-Control-Allow-Origin",
		"X-HTTP-Method-Override",
		"Content-Type",
		"Authorization",
		"Accept",
		"X-ETH-Data",
		"X-ETH-Signature",
		"X-ETH-Account",
	],
});
const server = new ApolloServer({
	schema: GraphQLSchema,
	// Check authentication
	context: async ({req}) => {
		const msg = Base64.decode(req.headers["x-eth-data"] || "");
		const signature = Base64.decode(req.headers["x-eth-signature"] || "");
		const publicAddress = Base64.decode(req.headers["x-eth-account"] || "");

		if (!signature || !publicAddress || !ethUtil.isValidAddress(publicAddress) || !msg) {
			return {isAuthenticated: false};
		}

		const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, "utf8"));
		const address = recoverPersonalSignature({data: msgBufferHex, signature});

		const isAuthenticated = publicAddress.toLowerCase() === address.toLowerCase();

		if (address.toLowerCase() === publicAddress.toLowerCase()) {
			return {isAuthenticated, account: publicAddress};
		}

		return {isAuthenticated};
	},
});

const startServer = server.start();
const connection = connectDatabase();

export default cors(async (req, res) => {
	if (req.method === "OPTIONS") {
		return send(res, 200, "ok!");
	}
	await connection;

	// User creation if not exists
	const publicAddress = Base64.decode(req.headers["x-eth-account"] || "");
	if (publicAddress) {
		try {
			const user = await User.findOne({"account": publicAddress});
			if (!user) {
				await User.create({
					username: formatAddress(publicAddress),
					account: publicAddress,
				});
			}
		} catch (err) {
			console.error(err);
		}
	}

	await startServer;
	return await server.createHandler({
		path: "/api/graphql",
	})(req, res);
});

export const config = {
	api: {
		bodyParser: false,
	},
};
