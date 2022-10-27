import {MarketItem, User} from "@packages/mongo";
import {SchemaComposer} from "graphql-compose";
import {composeWithMongoose} from "graphql-compose-mongoose";

import {searchArgs} from "@utils/graphql";
import {formatUnits} from "@utils/units";

export function marketItemSchemaComposer(schemaComposer: SchemaComposer) {
	const MarketItemTC = composeWithMongoose(MarketItem, {schemaComposer});
	MarketItemTC.addFields({
		price_formatted: {
			type: "Float",
			description: "Price formatted",
			resolve: (source: any) => formatUnits(source.price, "ether"),
		},
		is_liked: {
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
		is_favourited: {
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
	const marketItemsFindManyResolver =
		MarketItemTC.getResolver("findMany").addFilterArg(searchArgs);
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
			args: {token_id: "Int"},
			resolve: async (source, args, context, info) => {
				const {account, isAuthenticated} = context;
				if (!isAuthenticated) throw new Error("Not authenticated"); // Check auth
				const user = await User.updateOne({account: account}, {
					$push: {likes: args.token_id},
				} as any);
				if (!user) throw new Error("User not found"); // Check user
				await MarketItem.updateOne({_id: args.token_id}, {$inc: {"likes": 1}});
				return MarketItem.findOne({_id: args.token_id});
			},
		},
		dislike: {
			type: MarketItemTC,
			args: {token_id: "Int"},
			resolve: async (source, args, context, info) => {
				const {account, isAuthenticated} = context;
				if (!isAuthenticated) throw new Error("Not authenticated"); // Check auth
				const user = await User.updateOne({account: account}, {
					$pull: {likes: args.token_id},
				} as any);
				if (!user) throw new Error("User not found"); // Check user
				await MarketItem.updateOne({_id: args.token_id}, {$inc: {"likes": -1}});
				return MarketItem.findOne({_id: args.token_id});
			},
		},
		addToFavourites: {
			type: MarketItemTC,
			args: {token_id: "Int"},
			resolve: async (source, args, context, info) => {
				const {account, isAuthenticated} = context;
				if (!isAuthenticated) throw new Error("Not authenticated"); // Check auth
				const user = await User.updateOne(
					{account: account},
					{$push: {favourites: args.token_id} as any},
				);
				if (!user) throw new Error("User not found"); // Check user
				return MarketItem.findOne({_id: args.token_id});
			},
		},
		removeFromFavourites: {
			type: MarketItemTC,
			args: {token_id: "Int"},
			resolve: async (source, args, context, info) => {
				const {account, isAuthenticated} = context;
				if (!isAuthenticated) throw new Error("Not authenticated"); // Check auth
				const user = await User.updateOne(
					{account: account},
					{$pull: {favourites: args.token_id} as any},
				);
				if (!user) throw new Error("User not found"); // Check user
				return MarketItem.findOne({_id: args.token_id});
			},
		},
	});
}
