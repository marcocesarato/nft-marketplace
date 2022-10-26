import {User} from "@packages/mongo";
import {GraphQLJSON, SchemaComposer} from "graphql-compose";
import {composeWithMongoose} from "graphql-compose-mongoose";

import {searchArgs, wrapAccessResolve} from "@utils/graphql";

export function userSchemaComposer(schemaComposer: SchemaComposer) {
	// User
	const UserTC = composeWithMongoose(User, {schemaComposer});
	UserTC.addFields({
		planimetry: {
			type: GraphQLJSON,
			resolve: (source: any) => JSON.parse(source.planimetry),
		},
	});

	// Add search filter
	const userPaginationResolver = UserTC.getResolver("pagination").addFilterArg(searchArgs);
	const userFindManyResolver = UserTC.getResolver("findMany").addFilterArg(searchArgs);
	const userCountResolver = UserTC.getResolver("count").addFilterArg(searchArgs);
	UserTC.setResolver("pagination", userPaginationResolver);
	UserTC.setResolver("findMany", userFindManyResolver);
	UserTC.setResolver("count", userCountResolver);

	schemaComposer.Query.addFields({
		user: UserTC.getResolver("findOne"),
		users: UserTC.getResolver("findMany"),
		usersCount: UserTC.getResolver("count"),
		usersPagination: UserTC.getResolver("pagination"),
	});

	schemaComposer.Mutation.addFields({
		userUpdate: wrapAccessResolve(UserTC.getResolver("updateById"), (rp) => {
			rp.beforeQuery = (query, rp) => {
				const {account} = rp.context;
				query.where("account", account);
			};
		}),
		userUpdatePlanimetry: {
			type: UserTC,
			args: {planimetry: "JSON"},
			resolve: async (source, args, context, info) => {
				const {account, isAuthenticated} = context;
				if (!isAuthenticated) return false;
				const user = await User.findOne({account});
				if (!user) return false;
				await User.updateOne({account}, {"planimetry": JSON.stringify(args.planimetry)});
				return User.findOne({account});
			},
		},
	});
}
