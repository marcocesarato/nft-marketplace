import {ApolloServer} from "apollo-server-micro";
import * as ethUtil from "ethereumjs-util";
import {send} from "micro";
import Cors from "micro-cors";

import {connectDatabase} from "@database/connect";
import GraphQLSchema from "@database/graphql/schema";

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
		const signature = req.headers["X-ETH-Signature"] || "";
		const publicAddress = req.headers["X-ETH-Account"] || "";

		if (!signature || !publicAddress) {
			return {isAuthenticated: false};
		}

		const msg = "Authentication";
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

		if (address.toLowerCase() === publicAddress.toLowerCase()) {
			return {isAuthenticated: true, account: publicAddress};
		}

		return {isAuthenticated: false};
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
