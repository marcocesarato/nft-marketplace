import * as Apollo from "@apollo/client";

import useAccount from "@hooks/useAccount";
import {deepMerge} from "@utils/objects";

import {MarketItemsQuery, MarketItemsQueryVariables, useMarketItemsQuery} from "./generated";

export const useMarketItemsOwnedQuery = (
	baseOptions?: Apollo.QueryHookOptions<MarketItemsQuery, MarketItemsQueryVariables>,
) => {
	const {account} = useAccount();
	const options = deepMerge(baseOptions, {filter: {owner: account}});
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
	useMarketItemsLazyQuery,
	useMarketItemsQuery,
	useUserLazyQuery,
	useUserQuery,
} from "./generated";
