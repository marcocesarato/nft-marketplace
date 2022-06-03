import useAccount from "@hooks/useAccount";
import {deepMerge} from "@utils/objects";

import {MarketItemsQueryVariables, useMarketItemsQuery} from "./generated";

const generateVariables = (
	baseOptions?: MarketItemsQueryVariables,
	otherOptions?: MarketItemsQueryVariables,
): {variables: MarketItemsQueryVariables} => ({
	variables: deepMerge(baseOptions ?? {}, otherOptions),
});

export const useMarketItemsOnSaleQuery = (baseOptions?: MarketItemsQueryVariables) => {
	const options = generateVariables(baseOptions, {filter: {sold: false}});
	return useMarketItemsQuery(options);
};

export const useMarketItemsOwnedQuery = (baseOptions?: MarketItemsQueryVariables) => {
	const {account} = useAccount();
	const options = generateVariables({filter: {owner: account, sold: true}}, baseOptions);
	return useMarketItemsQuery(options);
};

export const useMarketItemsCreatedQuery = (baseOptions?: MarketItemsQueryVariables) => {
	const {account} = useAccount();

	const generatedVariables = generateVariables({filter: {creator: account}}, baseOptions);
	return useMarketItemsQuery(generatedVariables);
};

export {
	useAddToFavouritesMutation,
	useDislikeMutation,
	useLikeMutation,
	useMarketItemLazyQuery,
	useMarketItemQuery,
	useMarketItemsLazyQuery,
	useMarketItemsQuery,
	useRemoveFromFavouritesMutation,
	useUserLazyQuery,
	useUserQuery,
	useUserUpdateMutation,
	useUserUpdatePlanimetryMutation,
} from "./generated";
