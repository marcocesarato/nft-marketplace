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
});
const marketItemResolvers = MarketItemTC.mongooseResolvers;
schemaComposer.Query.addFields({
	marketItem: marketItemResolvers.findOne({lean: true}),
	marketItems: marketItemResolvers.findMany({lean: true}),
	marketItemsCount: marketItemResolvers.count(),
	marketItemsPagination: marketItemResolvers.pagination(),
});

const schema = schemaComposer.buildSchema();
export default schema;
