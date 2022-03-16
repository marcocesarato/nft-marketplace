import {Resolvers} from "@app/types";

import users from "./users";

const resolvers: Resolvers = {
	Query: {
		...users.Query,
	},
	Mutation: {
		...users.Mutation,
	},
};

export default resolvers;
