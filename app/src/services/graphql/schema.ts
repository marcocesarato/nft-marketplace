import {MarketItem, User} from "@packages/database";
import {GraphQLJSON, SchemaComposer} from "graphql-compose";
import {composeWithMongoose} from "graphql-compose-mongoose";

import {formatUnits} from "@utils/units";

// Create a new schema composer
const schemaComposer = new SchemaComposer();

// Check authentication from context
function wrapAccessResolve(resolver, callback = (rp) => {}) {
	return resolver.wrapResolve((next) => async (rp) => {
		rp.beforeRecordMutate = async function (doc, rp) {
			const {isAuthenticated} = rp.context;
			if (!isAuthenticated) {
				throw new Error("Forbidden!");
			}
			return doc;
		};
		callback(rp);
		return next(rp);
	});
}

const searchArgs = {
	name: "search",
	type: "String",
	query: (query, value, resolveParams) => {
		resolveParams.args.sort = {
			score: {$meta: "textScore"},
		};
		query.$text = {$search: value};
		resolveParams.projection.score = {$meta: "textScore"};
	},
};

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

// Market Item
const MarketItemTC = composeWithMongoose(MarketItem, {schemaComposer});
MarketItemTC.addFields({
	priceFormatted: {
		type: "Float",
		description: "Price formatted",
		resolve: (source: any) => formatUnits(source.price, "ether"),
	},
	isLiked: {
		type: "Boolean",
		resolve: async (source, args, context, info) => {
			const {isAuthenticated, account} = context;
			const {_id} = source;
			if (!isAuthenticated) return false;
			const user = await User.findOne({"account": account}).lean();
			if (!user) return false;
			return user?.likes?.includes(_id) || false;
		},
	},
	isFavourited: {
		type: "Boolean",
		resolve: async (source, args, context, info) => {
			const {isAuthenticated, account} = context;
			const {_id} = source;
			if (!isAuthenticated) return false;
			const user = await User.findOne({"account": account}).lean();
			if (!user) return false;
			return user?.favourites?.includes(_id) || false;
		},
	},
});

// Add search filter
const marketItemsPaginationResolver =
	MarketItemTC.getResolver("pagination").addFilterArg(searchArgs);
const marketItemsFindManyResolver = MarketItemTC.getResolver("findMany").addFilterArg(searchArgs);
const marketItemsCountResolver = MarketItemTC.getResolver("count").addFilterArg(searchArgs);
MarketItemTC.setResolver("pagination", marketItemsPaginationResolver);
MarketItemTC.setResolver("findMany", marketItemsFindManyResolver);
MarketItemTC.setResolver("count", marketItemsCountResolver);

schemaComposer.Query.addFields({
	marketItem: MarketItemTC.getResolver("findOne"),
	marketItems: MarketItemTC.getResolver("findMany"),
	marketItemsCount: MarketItemTC.getResolver("count"),
	marketItemsPagination: MarketItemTC.getResolver("pagination"),
});

schemaComposer.Mutation.addFields({
	like: {
		type: MarketItemTC,
		args: {tokenId: "Int"},
		resolve: async (source, args, context, info) => {
			const {account, isAuthenticated} = context;
			if (!isAuthenticated) throw new Error("Not authenticated"); // Check auth
			const user = await User.updateOne({account: account}, {
				$push: {likes: args.tokenId},
			} as any);
			if (!user) throw new Error("User not found"); // Check user
			await MarketItem.updateOne({_id: args.tokenId}, {$inc: {"likes": 1}});
			return MarketItem.findOne({_id: args.tokenId});
		},
	},
	dislike: {
		type: MarketItemTC,
		args: {tokenId: "Int"},
		resolve: async (source, args, context, info) => {
			const {account, isAuthenticated} = context;
			if (!isAuthenticated) throw new Error("Not authenticated"); // Check auth
			const user = await User.updateOne({account: account}, {
				$pull: {likes: args.tokenId},
			} as any);
			if (!user) throw new Error("User not found"); // Check user
			await MarketItem.updateOne({_id: args.tokenId}, {$inc: {"likes": -1}});
			return MarketItem.findOne({_id: args.tokenId});
		},
	},
	addToFavourites: {
		type: MarketItemTC,
		args: {tokenId: "Int"},
		resolve: async (source, args, context, info) => {
			const {account, isAuthenticated} = context;
			if (!isAuthenticated) throw new Error("Not authenticated"); // Check auth
			const user = await User.updateOne(
				{account: account},
				{$push: {favourites: args.tokenId} as any},
			);
			if (!user) throw new Error("User not found"); // Check user
			return MarketItem.findOne({_id: args.tokenId});
		},
	},
	removeFromFavourites: {
		type: MarketItemTC,
		args: {tokenId: "Int"},
		resolve: async (source, args, context, info) => {
			const {account, isAuthenticated} = context;
			if (!isAuthenticated) throw new Error("Not authenticated"); // Check auth
			const user = await User.updateOne(
				{account: account},
				{$pull: {favourites: args.tokenId} as any},
			);
			if (!user) throw new Error("User not found"); // Check user
			return MarketItem.findOne({_id: args.tokenId});
		},
	},
});

const schema = schemaComposer.buildSchema();
export default schema;
