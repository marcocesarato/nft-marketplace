import {gql} from "@apollo/client";
import * as Apollo from "@apollo/client";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>};
const defaultOptions = {"context": {"target": "subgraph"}} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	BigDecimal: any;
	BigInt: any;
	Bytes: any;
};

export type Account = {
	__typename?: "Account";
	created: Array<MarketItem>;
	id: Scalars["ID"];
	owned: Array<MarketItem>;
	selling: Array<MarketItem>;
};

export type AccountCreatedArgs = {
	first?: InputMaybe<Scalars["Int"]>;
	orderBy?: InputMaybe<MarketItem_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars["Int"]>;
	where?: InputMaybe<MarketItem_Filter>;
};

export type AccountOwnedArgs = {
	first?: InputMaybe<Scalars["Int"]>;
	orderBy?: InputMaybe<MarketItem_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars["Int"]>;
	where?: InputMaybe<MarketItem_Filter>;
};

export type AccountSellingArgs = {
	first?: InputMaybe<Scalars["Int"]>;
	orderBy?: InputMaybe<MarketItem_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars["Int"]>;
	where?: InputMaybe<MarketItem_Filter>;
};

export type Account_Filter = {
	id?: InputMaybe<Scalars["ID"]>;
	id_gt?: InputMaybe<Scalars["ID"]>;
	id_gte?: InputMaybe<Scalars["ID"]>;
	id_in?: InputMaybe<Array<Scalars["ID"]>>;
	id_lt?: InputMaybe<Scalars["ID"]>;
	id_lte?: InputMaybe<Scalars["ID"]>;
	id_not?: InputMaybe<Scalars["ID"]>;
	id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
};

export enum Account_OrderBy {
	Created = "created",
	Id = "id",
	Owned = "owned",
	Selling = "selling",
}

/** The block at which the query should be executed. */
export type Block_Height = {
	/** Value containing a block hash */
	hash?: InputMaybe<Scalars["Bytes"]>;
	/** Value containing a block number */
	number?: InputMaybe<Scalars["Int"]>;
	/**
	 * Value containing the minimum block number.
	 * In the case of `number_gte`, the query will be executed on the latest block only if
	 * the subgraph has progressed to or past the minimum block number.
	 * Defaults to the latest block when omitted.
	 *
	 */
	number_gte?: InputMaybe<Scalars["Int"]>;
};

export type MarketItem = {
	__typename?: "MarketItem";
	creator: Account;
	description?: Maybe<Scalars["String"]>;
	id: Scalars["ID"];
	image?: Maybe<Scalars["String"]>;
	name?: Maybe<Scalars["String"]>;
	owner: Account;
	price: Scalars["BigInt"];
	seller: Account;
	sold: Scalars["Boolean"];
	tokenId: Scalars["BigInt"];
	tokenURI?: Maybe<Scalars["String"]>;
};

export type MarketItem_Filter = {
	creator?: InputMaybe<Scalars["String"]>;
	creator_contains?: InputMaybe<Scalars["String"]>;
	creator_ends_with?: InputMaybe<Scalars["String"]>;
	creator_gt?: InputMaybe<Scalars["String"]>;
	creator_gte?: InputMaybe<Scalars["String"]>;
	creator_in?: InputMaybe<Array<Scalars["String"]>>;
	creator_lt?: InputMaybe<Scalars["String"]>;
	creator_lte?: InputMaybe<Scalars["String"]>;
	creator_not?: InputMaybe<Scalars["String"]>;
	creator_not_contains?: InputMaybe<Scalars["String"]>;
	creator_not_ends_with?: InputMaybe<Scalars["String"]>;
	creator_not_in?: InputMaybe<Array<Scalars["String"]>>;
	creator_not_starts_with?: InputMaybe<Scalars["String"]>;
	creator_starts_with?: InputMaybe<Scalars["String"]>;
	description?: InputMaybe<Scalars["String"]>;
	description_contains?: InputMaybe<Scalars["String"]>;
	description_ends_with?: InputMaybe<Scalars["String"]>;
	description_gt?: InputMaybe<Scalars["String"]>;
	description_gte?: InputMaybe<Scalars["String"]>;
	description_in?: InputMaybe<Array<Scalars["String"]>>;
	description_lt?: InputMaybe<Scalars["String"]>;
	description_lte?: InputMaybe<Scalars["String"]>;
	description_not?: InputMaybe<Scalars["String"]>;
	description_not_contains?: InputMaybe<Scalars["String"]>;
	description_not_ends_with?: InputMaybe<Scalars["String"]>;
	description_not_in?: InputMaybe<Array<Scalars["String"]>>;
	description_not_starts_with?: InputMaybe<Scalars["String"]>;
	description_starts_with?: InputMaybe<Scalars["String"]>;
	id?: InputMaybe<Scalars["ID"]>;
	id_gt?: InputMaybe<Scalars["ID"]>;
	id_gte?: InputMaybe<Scalars["ID"]>;
	id_in?: InputMaybe<Array<Scalars["ID"]>>;
	id_lt?: InputMaybe<Scalars["ID"]>;
	id_lte?: InputMaybe<Scalars["ID"]>;
	id_not?: InputMaybe<Scalars["ID"]>;
	id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
	image?: InputMaybe<Scalars["String"]>;
	image_contains?: InputMaybe<Scalars["String"]>;
	image_ends_with?: InputMaybe<Scalars["String"]>;
	image_gt?: InputMaybe<Scalars["String"]>;
	image_gte?: InputMaybe<Scalars["String"]>;
	image_in?: InputMaybe<Array<Scalars["String"]>>;
	image_lt?: InputMaybe<Scalars["String"]>;
	image_lte?: InputMaybe<Scalars["String"]>;
	image_not?: InputMaybe<Scalars["String"]>;
	image_not_contains?: InputMaybe<Scalars["String"]>;
	image_not_ends_with?: InputMaybe<Scalars["String"]>;
	image_not_in?: InputMaybe<Array<Scalars["String"]>>;
	image_not_starts_with?: InputMaybe<Scalars["String"]>;
	image_starts_with?: InputMaybe<Scalars["String"]>;
	name?: InputMaybe<Scalars["String"]>;
	name_contains?: InputMaybe<Scalars["String"]>;
	name_ends_with?: InputMaybe<Scalars["String"]>;
	name_gt?: InputMaybe<Scalars["String"]>;
	name_gte?: InputMaybe<Scalars["String"]>;
	name_in?: InputMaybe<Array<Scalars["String"]>>;
	name_lt?: InputMaybe<Scalars["String"]>;
	name_lte?: InputMaybe<Scalars["String"]>;
	name_not?: InputMaybe<Scalars["String"]>;
	name_not_contains?: InputMaybe<Scalars["String"]>;
	name_not_ends_with?: InputMaybe<Scalars["String"]>;
	name_not_in?: InputMaybe<Array<Scalars["String"]>>;
	name_not_starts_with?: InputMaybe<Scalars["String"]>;
	name_starts_with?: InputMaybe<Scalars["String"]>;
	owner?: InputMaybe<Scalars["String"]>;
	owner_contains?: InputMaybe<Scalars["String"]>;
	owner_ends_with?: InputMaybe<Scalars["String"]>;
	owner_gt?: InputMaybe<Scalars["String"]>;
	owner_gte?: InputMaybe<Scalars["String"]>;
	owner_in?: InputMaybe<Array<Scalars["String"]>>;
	owner_lt?: InputMaybe<Scalars["String"]>;
	owner_lte?: InputMaybe<Scalars["String"]>;
	owner_not?: InputMaybe<Scalars["String"]>;
	owner_not_contains?: InputMaybe<Scalars["String"]>;
	owner_not_ends_with?: InputMaybe<Scalars["String"]>;
	owner_not_in?: InputMaybe<Array<Scalars["String"]>>;
	owner_not_starts_with?: InputMaybe<Scalars["String"]>;
	owner_starts_with?: InputMaybe<Scalars["String"]>;
	price?: InputMaybe<Scalars["BigInt"]>;
	price_gt?: InputMaybe<Scalars["BigInt"]>;
	price_gte?: InputMaybe<Scalars["BigInt"]>;
	price_in?: InputMaybe<Array<Scalars["BigInt"]>>;
	price_lt?: InputMaybe<Scalars["BigInt"]>;
	price_lte?: InputMaybe<Scalars["BigInt"]>;
	price_not?: InputMaybe<Scalars["BigInt"]>;
	price_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
	seller?: InputMaybe<Scalars["String"]>;
	seller_contains?: InputMaybe<Scalars["String"]>;
	seller_ends_with?: InputMaybe<Scalars["String"]>;
	seller_gt?: InputMaybe<Scalars["String"]>;
	seller_gte?: InputMaybe<Scalars["String"]>;
	seller_in?: InputMaybe<Array<Scalars["String"]>>;
	seller_lt?: InputMaybe<Scalars["String"]>;
	seller_lte?: InputMaybe<Scalars["String"]>;
	seller_not?: InputMaybe<Scalars["String"]>;
	seller_not_contains?: InputMaybe<Scalars["String"]>;
	seller_not_ends_with?: InputMaybe<Scalars["String"]>;
	seller_not_in?: InputMaybe<Array<Scalars["String"]>>;
	seller_not_starts_with?: InputMaybe<Scalars["String"]>;
	seller_starts_with?: InputMaybe<Scalars["String"]>;
	sold?: InputMaybe<Scalars["Boolean"]>;
	sold_in?: InputMaybe<Array<Scalars["Boolean"]>>;
	sold_not?: InputMaybe<Scalars["Boolean"]>;
	sold_not_in?: InputMaybe<Array<Scalars["Boolean"]>>;
	tokenId?: InputMaybe<Scalars["BigInt"]>;
	tokenId_gt?: InputMaybe<Scalars["BigInt"]>;
	tokenId_gte?: InputMaybe<Scalars["BigInt"]>;
	tokenId_in?: InputMaybe<Array<Scalars["BigInt"]>>;
	tokenId_lt?: InputMaybe<Scalars["BigInt"]>;
	tokenId_lte?: InputMaybe<Scalars["BigInt"]>;
	tokenId_not?: InputMaybe<Scalars["BigInt"]>;
	tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
	tokenURI?: InputMaybe<Scalars["String"]>;
	tokenURI_contains?: InputMaybe<Scalars["String"]>;
	tokenURI_ends_with?: InputMaybe<Scalars["String"]>;
	tokenURI_gt?: InputMaybe<Scalars["String"]>;
	tokenURI_gte?: InputMaybe<Scalars["String"]>;
	tokenURI_in?: InputMaybe<Array<Scalars["String"]>>;
	tokenURI_lt?: InputMaybe<Scalars["String"]>;
	tokenURI_lte?: InputMaybe<Scalars["String"]>;
	tokenURI_not?: InputMaybe<Scalars["String"]>;
	tokenURI_not_contains?: InputMaybe<Scalars["String"]>;
	tokenURI_not_ends_with?: InputMaybe<Scalars["String"]>;
	tokenURI_not_in?: InputMaybe<Array<Scalars["String"]>>;
	tokenURI_not_starts_with?: InputMaybe<Scalars["String"]>;
	tokenURI_starts_with?: InputMaybe<Scalars["String"]>;
};

export enum MarketItem_OrderBy {
	Creator = "creator",
	Description = "description",
	Id = "id",
	Image = "image",
	Name = "name",
	Owner = "owner",
	Price = "price",
	Seller = "seller",
	Sold = "sold",
	TokenId = "tokenId",
	TokenUri = "tokenURI",
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
	Asc = "asc",
	Desc = "desc",
}

export type Query = {
	__typename?: "Query";
	/** Access to subgraph metadata */
	_meta?: Maybe<_Meta_>;
	account?: Maybe<Account>;
	accounts: Array<Account>;
	bandSearch: Array<MarketItem>;
	marketItem?: Maybe<MarketItem>;
	marketItems: Array<MarketItem>;
	transfer?: Maybe<Transfer>;
	transfers: Array<Transfer>;
};

export type Query_MetaArgs = {
	block?: InputMaybe<Block_Height>;
};

export type QueryAccountArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars["ID"];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAccountsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars["Int"]>;
	orderBy?: InputMaybe<Account_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars["Int"]>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Account_Filter>;
};

export type QueryBandSearchArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars["Int"]>;
	skip?: InputMaybe<Scalars["Int"]>;
	subgraphError?: _SubgraphErrorPolicy_;
	text: Scalars["String"];
};

export type QueryMarketItemArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars["ID"];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryMarketItemsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars["Int"]>;
	orderBy?: InputMaybe<MarketItem_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars["Int"]>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<MarketItem_Filter>;
};

export type QueryTransferArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars["ID"];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTransfersArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars["Int"]>;
	orderBy?: InputMaybe<Transfer_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars["Int"]>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Transfer_Filter>;
};

export type Subscription = {
	__typename?: "Subscription";
	/** Access to subgraph metadata */
	_meta?: Maybe<_Meta_>;
	account?: Maybe<Account>;
	accounts: Array<Account>;
	marketItem?: Maybe<MarketItem>;
	marketItems: Array<MarketItem>;
	transfer?: Maybe<Transfer>;
	transfers: Array<Transfer>;
};

export type Subscription_MetaArgs = {
	block?: InputMaybe<Block_Height>;
};

export type SubscriptionAccountArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars["ID"];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAccountsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars["Int"]>;
	orderBy?: InputMaybe<Account_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars["Int"]>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Account_Filter>;
};

export type SubscriptionMarketItemArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars["ID"];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionMarketItemsArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars["Int"]>;
	orderBy?: InputMaybe<MarketItem_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars["Int"]>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<MarketItem_Filter>;
};

export type SubscriptionTransferArgs = {
	block?: InputMaybe<Block_Height>;
	id: Scalars["ID"];
	subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTransfersArgs = {
	block?: InputMaybe<Block_Height>;
	first?: InputMaybe<Scalars["Int"]>;
	orderBy?: InputMaybe<Transfer_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	skip?: InputMaybe<Scalars["Int"]>;
	subgraphError?: _SubgraphErrorPolicy_;
	where?: InputMaybe<Transfer_Filter>;
};

export type Transfer = {
	__typename?: "Transfer";
	from: Account;
	id: Scalars["ID"];
	to: Account;
	tokenId: Scalars["BigInt"];
};

export type Transfer_Filter = {
	from?: InputMaybe<Scalars["String"]>;
	from_contains?: InputMaybe<Scalars["String"]>;
	from_ends_with?: InputMaybe<Scalars["String"]>;
	from_gt?: InputMaybe<Scalars["String"]>;
	from_gte?: InputMaybe<Scalars["String"]>;
	from_in?: InputMaybe<Array<Scalars["String"]>>;
	from_lt?: InputMaybe<Scalars["String"]>;
	from_lte?: InputMaybe<Scalars["String"]>;
	from_not?: InputMaybe<Scalars["String"]>;
	from_not_contains?: InputMaybe<Scalars["String"]>;
	from_not_ends_with?: InputMaybe<Scalars["String"]>;
	from_not_in?: InputMaybe<Array<Scalars["String"]>>;
	from_not_starts_with?: InputMaybe<Scalars["String"]>;
	from_starts_with?: InputMaybe<Scalars["String"]>;
	id?: InputMaybe<Scalars["ID"]>;
	id_gt?: InputMaybe<Scalars["ID"]>;
	id_gte?: InputMaybe<Scalars["ID"]>;
	id_in?: InputMaybe<Array<Scalars["ID"]>>;
	id_lt?: InputMaybe<Scalars["ID"]>;
	id_lte?: InputMaybe<Scalars["ID"]>;
	id_not?: InputMaybe<Scalars["ID"]>;
	id_not_in?: InputMaybe<Array<Scalars["ID"]>>;
	to?: InputMaybe<Scalars["String"]>;
	to_contains?: InputMaybe<Scalars["String"]>;
	to_ends_with?: InputMaybe<Scalars["String"]>;
	to_gt?: InputMaybe<Scalars["String"]>;
	to_gte?: InputMaybe<Scalars["String"]>;
	to_in?: InputMaybe<Array<Scalars["String"]>>;
	to_lt?: InputMaybe<Scalars["String"]>;
	to_lte?: InputMaybe<Scalars["String"]>;
	to_not?: InputMaybe<Scalars["String"]>;
	to_not_contains?: InputMaybe<Scalars["String"]>;
	to_not_ends_with?: InputMaybe<Scalars["String"]>;
	to_not_in?: InputMaybe<Array<Scalars["String"]>>;
	to_not_starts_with?: InputMaybe<Scalars["String"]>;
	to_starts_with?: InputMaybe<Scalars["String"]>;
	tokenId?: InputMaybe<Scalars["BigInt"]>;
	tokenId_gt?: InputMaybe<Scalars["BigInt"]>;
	tokenId_gte?: InputMaybe<Scalars["BigInt"]>;
	tokenId_in?: InputMaybe<Array<Scalars["BigInt"]>>;
	tokenId_lt?: InputMaybe<Scalars["BigInt"]>;
	tokenId_lte?: InputMaybe<Scalars["BigInt"]>;
	tokenId_not?: InputMaybe<Scalars["BigInt"]>;
	tokenId_not_in?: InputMaybe<Array<Scalars["BigInt"]>>;
};

export enum Transfer_OrderBy {
	From = "from",
	Id = "id",
	To = "to",
	TokenId = "tokenId",
}

export type _Block_ = {
	__typename?: "_Block_";
	/** The hash of the block */
	hash?: Maybe<Scalars["Bytes"]>;
	/** The block number */
	number: Scalars["Int"];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
	__typename?: "_Meta_";
	/**
	 * Information about a specific subgraph block. The hash of the block
	 * will be null if the _meta field has a block constraint that asks for
	 * a block number. It will be filled if the _meta field has no block constraint
	 * and therefore asks for the latest  block
	 *
	 */
	block: _Block_;
	/** The deployment ID */
	deployment: Scalars["String"];
	/** If `true`, the subgraph encountered indexing errors at some past block */
	hasIndexingErrors: Scalars["Boolean"];
};

export enum _SubgraphErrorPolicy_ {
	/** Data will be returned even if the subgraph has indexing errors */
	Allow = "allow",
	/** If the subgraph has indexing errors, data will be omitted. The default. */
	Deny = "deny",
}

export type MarketItemsQueryVariables = Exact<{
	skip?: InputMaybe<Scalars["Int"]>;
	first?: InputMaybe<Scalars["Int"]>;
	orderBy?: InputMaybe<MarketItem_OrderBy>;
	orderDirection?: InputMaybe<OrderDirection>;
	where?: InputMaybe<MarketItem_Filter>;
}>;

export type MarketItemsQuery = {
	__typename?: "Query";
	marketItems: Array<{
		__typename?: "MarketItem";
		description?: string | null;
		id: string;
		image?: string | null;
		name?: string | null;
		price: any;
		sold: boolean;
		tokenId: any;
		owner: {__typename?: "Account"; id: string};
		seller: {__typename?: "Account"; id: string};
	}>;
};

export const MarketItemsDocument = gql`
	query MarketItems(
		$skip: Int
		$first: Int
		$orderBy: MarketItem_orderBy
		$orderDirection: OrderDirection
		$where: MarketItem_filter
	) {
		marketItems(
			orderBy: $orderBy
			orderDirection: $orderDirection
			where: $where
			skip: $skip
			first: $first
		) {
			description
			id
			image
			name
			owner {
				id
			}
			price
			sold
			seller {
				id
			}
			tokenId
		}
	}
`;

/**
 * __useMarketItemsQuery__
 *
 * To run a query within a React component, call `useMarketItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketItemsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useMarketItemsQuery(
	baseOptions?: Apollo.QueryHookOptions<MarketItemsQuery, MarketItemsQueryVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useQuery<MarketItemsQuery, MarketItemsQueryVariables>(
		MarketItemsDocument,
		options,
	);
}
export function useMarketItemsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<MarketItemsQuery, MarketItemsQueryVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useLazyQuery<MarketItemsQuery, MarketItemsQueryVariables>(
		MarketItemsDocument,
		options,
	);
}
export type MarketItemsQueryHookResult = ReturnType<typeof useMarketItemsQuery>;
export type MarketItemsLazyQueryHookResult = ReturnType<typeof useMarketItemsLazyQuery>;
export type MarketItemsQueryResult = Apollo.QueryResult<
	MarketItemsQuery,
	MarketItemsQueryVariables
>;
