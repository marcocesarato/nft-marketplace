import * as Apollo from "@apollo/client";

import useAccount from "@hooks/useAccount";
import {deepMerge} from "@utils/objects";

import {MarketItemsQuery, MarketItemsQueryVariables, useMarketItemsQuery} from "./generated";

export const useMarketItemsOnSaleQuery = (
	baseOptions?: Apollo.QueryHookOptions<MarketItemsQuery, MarketItemsQueryVariables>,
) => {
	const options = deepMerge(baseOptions, {variables: {filter: {sold: false}}});
	return useMarketItemsQuery(options);
};

export const useMarketItemsOwnedQuery = (
	baseOptions?: Apollo.QueryHookOptions<MarketItemsQuery, MarketItemsQueryVariables>,
) => {
	const {account} = useAccount();
	const options = deepMerge(baseOptions, {filter: {owner: account, sold: true}});
	return useMarketItemsQuery(options);
};

export const useMarketItemsCreatedQuery = (
	baseOptions?: Apollo.QueryHookOptions<MarketItemsQuery, MarketItemsQueryVariables>,
) => {
	const {account} = useAccount();
	const options = deepMerge(baseOptions, {filter: {creator: account}});
	return useMarketItemsQuery(options);
};

export {
	useAddToFavouritesMutation,
	useDislikeMutation,
	useLikeMutation,
	useMarketItemsLazyQuery,
	useMarketItemsQuery,
	useRemoveFromFavouritesMutation,
	useUserLazyQuery,
	useUserQuery,
	useUserUpdateMutation,
} from "./generated";
