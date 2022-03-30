import {SchemaComposer} from "graphql-compose";
import {composeMongoose} from "graphql-compose-mongoose";

import MarketItem from "@models/MarketItem";
import User from "@models/User";
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

// User
const UserTC = composeMongoose(User, {schemaComposer});
const userResolvers = UserTC.mongooseResolvers;
schemaComposer.Query.addFields({
	user: userResolvers.findOne({lean: true}),
	users: userResolvers.findMany({lean: true}),
	usersCount: userResolvers.count(),
	usersPagination: userResolvers.pagination(),
});
schemaComposer.Mutation.addFields({
	userUpdate: wrapAccessResolve(userResolvers.updateById(), (rp) => {
		rp.beforeQuery = (query, rp) => {
			const {account} = rp.context;
			query.where("account", account);
		};
	}),
});

// Market Item
const MarketItemTC = composeMongoose(MarketItem, {schemaComposer});
MarketItemTC.addFields({
	priceFormatted: {
		type: "Float",
		description: "Price formatted",
		resolve: (source) => formatUnits(source.price, "ether"),
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
});
const marketItemResolvers = MarketItemTC.mongooseResolvers;
schemaComposer.Query.addFields({
	marketItem: marketItemResolvers.findOne({lean: true}),
	marketItems: marketItemResolvers.findMany({lean: true}),
	marketItemsCount: marketItemResolvers.count(),
	marketItemsPagination: marketItemResolvers.pagination(),
});
schemaComposer.Mutation.addFields({
	like: {
		type: MarketItemTC,
		args: {tokenId: "Int"},
		resolve: async (source, args, context, info) => {
			const {account, isAuthenticated} = context;
			if (!isAuthenticated) throw new Error("Not authenticated"); // Check auth
			const user = await User.updateOne({account: account}, {$push: {likes: args.tokenId}});
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
			const user = await User.updateOne({account: account}, {$pull: {likes: args.tokenId}});
			if (!user) throw new Error("User not found"); // Check user
			await MarketItem.updateOne({_id: args.tokenId}, {$inc: {"likes": -1}});
			return MarketItem.findOne({_id: args.tokenId});
		},
	},
});

const schema = schemaComposer.buildSchema();
export default schema;
