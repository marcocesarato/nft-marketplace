import {connectDatabase, User} from "@packages/mongo";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
import {ApolloServer} from "apollo-server-micro";
import {send} from "micro";
import Cors from "micro-cors";
import {NextApiRequest, NextApiResponse} from "next";

import GraphQLSchema from "@services/graphql/schema";
import {formatAddress} from "@utils/formatters";
import {withSessionRoute} from "@utils/session";

const cors = Cors({
	allowCredentials: true,
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
		return {
			isAuthenticated: req.session.isAuthenticated || false,
			account: String(req.session.account || "").toLowerCase(),
		};
	},
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = server.start();
const connection = connectDatabase();

const graphqlRoute = cors(async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "OPTIONS") {
		return send(res, 200, "ok!");
	}
	await connection;

	// User creation if not exists
	const publicAddress = req.session.account;
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

export default withSessionRoute(graphqlRoute);

export const config = {
	api: {
		bodyParser: false,
	},
};
