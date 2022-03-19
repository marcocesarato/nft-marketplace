import {ApolloServer} from "apollo-server-micro";
import * as ethUtil from "ethereumjs-util";
import {send} from "micro";
import Cors from "micro-cors";

import {connectDatabase} from "@database/connect";
import GraphQLSchema from "@database/graphql/schema";
import User from "@models/User";
import {formatAddress} from "@utils/formatters";

connectDatabase();

const cors = Cors({
	allowHeaders: [
		"X-Requested-With",
		"Access-Control-Allow-Origin",
		"X-HTTP-Method-Override",
		"Content-Type",
		"Authorization",
		"Accept",
		"X-ETH-Signature",
		"X-ETH-Account",
	],
});
const server = new ApolloServer({
	schema: GraphQLSchema,
	// Check authentication
	context: ({req}) => {
		const signature = req.headers["x-eth-signature"];
		const publicAddress = req.headers["x-eth-account"];

		if (!signature || !publicAddress) {
			return {isAuthenticated: false};
		}

		const msg = "0x";
		const msgBuffer = ethUtil.toBuffer(msg);
		const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
		const signatureParams = ethUtil.fromRpcSig(signature);
		// Elliptic curve signature verification
		const publicKey = ethUtil.ecrecover(
			msgHash,
			signatureParams.v,
			signatureParams.r,
			signatureParams.s,
		);
		const addressBuffer = ethUtil.publicToAddress(publicKey);
		const address = ethUtil.bufferToHex(addressBuffer);

		// User creation if not exists
		User.findOne({"account": publicAddress}, (err, user) => {
			if (err || !user) {
				User.create({
					username: formatAddress(publicAddress),
					account: publicAddress,
				});
			}
		});

		const isAuthenticated = publicAddress.toLowerCase() === address.toLowerCase();
		console.log("isAuthenticated", isAuthenticated);

		if (address.toLowerCase() === publicAddress.toLowerCase()) {
			return {isAuthenticated, account: publicAddress};
		}

		return {isAuthenticated};
	},
});
const startServer = server.start();

export default cors(async (req, res) => {
	if (req.method === "OPTIONS") {
		return send(res, 200, "ok!");
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
