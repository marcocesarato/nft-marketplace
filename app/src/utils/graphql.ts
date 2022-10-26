// Check authentication from context
export function wrapAccessResolve(resolver, callback = (rp) => {}) {
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

export const searchArgs = {
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
