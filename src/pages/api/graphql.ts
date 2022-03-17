import {ApolloServer} from "apollo-server-micro";
import {send} from "micro";
import Cors from "micro-cors";

import {connectDatabase} from "@database/connect";
import GraphQLSchema from "@database/graphql/schema";

connectDatabase();

const cors = Cors();
const server = new ApolloServer({
	schema: GraphQLSchema,
	context() {
		return {isAuthenticated: true, account: "0x0000000000000"};
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
