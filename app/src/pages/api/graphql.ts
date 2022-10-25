import {connectDatabase, User} from "@packages/mongo";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
import {ApolloServer} from "apollo-server-micro";
import {send} from "micro";
import Cors from "micro-cors";
import {NextApiRequest, NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";

import {TUserData} from "@app/types";
import GraphQLSchema from "@services/graphql/schema";
import {formatAddress} from "@utils/formatters";

const cors = Cors({
	allowCredentials: true,
});
const server = new ApolloServer({
	schema: GraphQLSchema,
	cache: "bounded",
	// Check authentication
	context: async ({req}: {req: NextApiRequest}) => {
		const token = await getToken({req});
		const context = {
			isAuthenticated: !!token.user,
			account: String((token.user as TUserData).address || "").toLowerCase(),
		};
		return context;
	},
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = server.start();
const connection = connectDatabase();

const graphqlRoute = cors(async (req: NextApiRequest, res: NextApiResponse) => {
	const token = await getToken({req});

	if (req.method === "OPTIONS") {
		return send(res, 200, "ok");
	}

	if (!token || !token?.user) {
		return send(res, 401, "Unauthorized");
	}

	await connection;

	// User creation if not exists
	const publicAddress = String((token.user as TUserData).address || "");
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

export default graphqlRoute;

export const config = {
	api: {
		bodyParser: false,
	},
};
