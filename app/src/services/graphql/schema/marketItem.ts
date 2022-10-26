import {MarketItem, User} from "@packages/mongo";
import {SchemaComposer} from "graphql-compose";
import {composeWithMongoose} from "graphql-compose-mongoose";

import {searchArgs} from "@utils/graphql";
import {formatUnits} from "@utils/units";

export function marketItemSchemaComposer(schemaComposer: SchemaComposer) {
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
}
