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
	const {address} = useAccount();
	const options = generateVariables({filter: {owner_of: address, sold: true}}, baseOptions);
	return useMarketItemsQuery(options);
};

export const useMarketItemsOwnedOnSaleQuery = (baseOptions?: MarketItemsQueryVariables) => {
	const {address} = useAccount();
	const options = generateVariables({filter: {seller: address, sold: false}}, baseOptions);
	return useMarketItemsQuery(options);
};

export const useMarketItemsCreatedQuery = (baseOptions?: MarketItemsQueryVariables) => {
	const {address} = useAccount();

	const generatedVariables = generateVariables({filter: {creator: address}}, baseOptions);
	return useMarketItemsQuery(generatedVariables);
};

export const useMarketItemsByIdsQuery = (
	ids: number[],
	baseOptions?: MarketItemsQueryVariables,
) => {
	const generatedVariables = generateVariables(
		{filter: {_operators: {_id: {in: ids}}}},
		baseOptions,
	);
	return useMarketItemsQuery(generatedVariables);
};

export {
	useAccountNftQuery as useAccountNFTQuery,
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
	useWalletNfTsQuery as useWalletNFTsQuery,
	useWalletNftTransferQuery as useWalletNFTTransferQuery,
} from "./generated";
