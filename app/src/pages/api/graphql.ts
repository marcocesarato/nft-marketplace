import {connectDatabase, User} from "@packages/mongo";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
import {ApolloServer} from "apollo-server-micro";
import {Base64} from "js-base64";
import {send} from "micro";
import Cors from "micro-cors";
import {NextApiRequest, NextApiResponse} from "next";

import GraphQLSchema from "@services/graphql/schema";
import {authSignature} from "@utils/auth";
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
	cache: "bounded",
	// Check authentication
	context: async ({req}: {req: NextApiRequest}) => {
		const msg = Base64.decode((req.headers["x-eth-data"] as string) || "");
		const sign = Base64.decode((req.headers["x-eth-signature"] as string) || "");
		const account = Base64.decode((req.headers["x-eth-account"] as string) || "");
		const isAuthenticated = authSignature(msg, sign, account);
		return {isAuthenticated, account: account.toLowerCase()};
	},
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = server.start();
const connection = connectDatabase();

export default cors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "OPTIONS") {
		return send(res, 200, "ok!");
	}
	await connection;

	// User creation if not exists
	const publicAddress = Base64.decode((req.headers["x-eth-account"] as string) || "");
	if (publicAddress) {
		try {
			const user = await User.findOne({"account": publicAddress});
			if (!user) {
				await User.create({
					username: formatAddress(publicAddress),
					account: publicAddress.toLowerCase(),
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
