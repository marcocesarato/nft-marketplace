import {gql} from "@apollo/client";
import * as Apollo from "@apollo/client";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Date: any;
	/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
	JSON: any;
	/**
	 * The `ID` scalar type represents a unique MongoDB identifier in collection.
	 * MongoDB by default use 12-byte ObjectId value
	 * (https://docs.mongodb.com/manual/reference/bson-types/#objectid). But MongoDB
	 * also may accepts string or integer as correct values for _id field.
	 */
	MongoID: any;
};

export type ErrorInterface = {
	/** Generic error message */
	message?: Maybe<Scalars["String"]>;
};

export type FilterCountMarketItemAttributesInput = {
	_id?: InputMaybe<Scalars["MongoID"]>;
	displayType?: InputMaybe<Scalars["String"]>;
	traitType?: InputMaybe<Scalars["String"]>;
	value?: InputMaybe<Scalars["String"]>;
};

export type FilterCountMarketItemInput = {
	AND?: InputMaybe<Array<FilterCountMarketItemInput>>;
	OR?: InputMaybe<Array<FilterCountMarketItemInput>>;
	_id?: InputMaybe<Scalars["Int"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterCountMarketItemOperatorsInput>;
	animationUrl?: InputMaybe<Scalars["String"]>;
	attributes?: InputMaybe<Array<InputMaybe<FilterCountMarketItemAttributesInput>>>;
	createdAt?: InputMaybe<Scalars["Date"]>;
	creator?: InputMaybe<Scalars["String"]>;
	description?: InputMaybe<Scalars["String"]>;
	externalUrl?: InputMaybe<Scalars["String"]>;
	image?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Scalars["Float"]>;
	name?: InputMaybe<Scalars["String"]>;
	owner?: InputMaybe<Scalars["String"]>;
	price?: InputMaybe<Scalars["String"]>;
	seller?: InputMaybe<Scalars["String"]>;
	sold?: InputMaybe<Scalars["Boolean"]>;
	thumbnail?: InputMaybe<Scalars["String"]>;
	tokenId?: InputMaybe<Scalars["Float"]>;
	tokenURI?: InputMaybe<Scalars["String"]>;
	updatedAt?: InputMaybe<Scalars["Date"]>;
	youtubeUrl?: InputMaybe<Scalars["String"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountMarketItemOperatorsInput = {
	_id?: InputMaybe<FilterCountMarketItem_IdOperatorsInput>;
};

export type FilterCountMarketItem_IdOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["Int"]>;
	gte?: InputMaybe<Scalars["Int"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
	lt?: InputMaybe<Scalars["Int"]>;
	lte?: InputMaybe<Scalars["Int"]>;
	ne?: InputMaybe<Scalars["Int"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
};

export type FilterCountUserInput = {
	AND?: InputMaybe<Array<FilterCountUserInput>>;
	OR?: InputMaybe<Array<FilterCountUserInput>>;
	_id?: InputMaybe<Scalars["MongoID"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterCountUserOperatorsInput>;
	account?: InputMaybe<Scalars["String"]>;
	cover?: InputMaybe<Scalars["String"]>;
	createdAt?: InputMaybe<Scalars["Date"]>;
	favourites?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	icon?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	planimetry?: InputMaybe<FilterCountUserPlanimetryInput>;
	updatedAt?: InputMaybe<Scalars["Date"]>;
	username?: InputMaybe<Scalars["String"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountUserOperatorsInput = {
	_id?: InputMaybe<FilterCountUser_IdOperatorsInput>;
};

export type FilterCountUserPlanimetryInput = {
	type?: InputMaybe<Scalars["JSON"]>;
};

export type FilterCountUser_IdOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["MongoID"]>;
	gte?: InputMaybe<Scalars["MongoID"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["MongoID"]>>>;
	lt?: InputMaybe<Scalars["MongoID"]>;
	lte?: InputMaybe<Scalars["MongoID"]>;
	ne?: InputMaybe<Scalars["MongoID"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["MongoID"]>>>;
};

export type FilterFindManyMarketItemAttributesInput = {
	_id?: InputMaybe<Scalars["MongoID"]>;
	displayType?: InputMaybe<Scalars["String"]>;
	traitType?: InputMaybe<Scalars["String"]>;
	value?: InputMaybe<Scalars["String"]>;
};

export type FilterFindManyMarketItemInput = {
	AND?: InputMaybe<Array<FilterFindManyMarketItemInput>>;
	OR?: InputMaybe<Array<FilterFindManyMarketItemInput>>;
	_id?: InputMaybe<Scalars["Int"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterFindManyMarketItemOperatorsInput>;
	animationUrl?: InputMaybe<Scalars["String"]>;
	attributes?: InputMaybe<Array<InputMaybe<FilterFindManyMarketItemAttributesInput>>>;
	createdAt?: InputMaybe<Scalars["Date"]>;
	creator?: InputMaybe<Scalars["String"]>;
	description?: InputMaybe<Scalars["String"]>;
	externalUrl?: InputMaybe<Scalars["String"]>;
	image?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Scalars["Float"]>;
	name?: InputMaybe<Scalars["String"]>;
	owner?: InputMaybe<Scalars["String"]>;
	price?: InputMaybe<Scalars["String"]>;
	seller?: InputMaybe<Scalars["String"]>;
	sold?: InputMaybe<Scalars["Boolean"]>;
	thumbnail?: InputMaybe<Scalars["String"]>;
	tokenId?: InputMaybe<Scalars["Float"]>;
	tokenURI?: InputMaybe<Scalars["String"]>;
	updatedAt?: InputMaybe<Scalars["Date"]>;
	youtubeUrl?: InputMaybe<Scalars["String"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyMarketItemOperatorsInput = {
	_id?: InputMaybe<FilterFindManyMarketItem_IdOperatorsInput>;
};

export type FilterFindManyMarketItem_IdOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["Int"]>;
	gte?: InputMaybe<Scalars["Int"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
	lt?: InputMaybe<Scalars["Int"]>;
	lte?: InputMaybe<Scalars["Int"]>;
	ne?: InputMaybe<Scalars["Int"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
};

export type FilterFindManyUserInput = {
	AND?: InputMaybe<Array<FilterFindManyUserInput>>;
	OR?: InputMaybe<Array<FilterFindManyUserInput>>;
	_id?: InputMaybe<Scalars["MongoID"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterFindManyUserOperatorsInput>;
	account?: InputMaybe<Scalars["String"]>;
	cover?: InputMaybe<Scalars["String"]>;
	createdAt?: InputMaybe<Scalars["Date"]>;
	favourites?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	icon?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	planimetry?: InputMaybe<FilterFindManyUserPlanimetryInput>;
	updatedAt?: InputMaybe<Scalars["Date"]>;
	username?: InputMaybe<Scalars["String"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyUserOperatorsInput = {
	_id?: InputMaybe<FilterFindManyUser_IdOperatorsInput>;
};

export type FilterFindManyUserPlanimetryInput = {
	type?: InputMaybe<Scalars["JSON"]>;
};

export type FilterFindManyUser_IdOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["MongoID"]>;
	gte?: InputMaybe<Scalars["MongoID"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["MongoID"]>>>;
	lt?: InputMaybe<Scalars["MongoID"]>;
	lte?: InputMaybe<Scalars["MongoID"]>;
	ne?: InputMaybe<Scalars["MongoID"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["MongoID"]>>>;
};

export type FilterFindOneMarketItemAttributesInput = {
	_id?: InputMaybe<Scalars["MongoID"]>;
	displayType?: InputMaybe<Scalars["String"]>;
	traitType?: InputMaybe<Scalars["String"]>;
	value?: InputMaybe<Scalars["String"]>;
};

export type FilterFindOneMarketItemInput = {
	AND?: InputMaybe<Array<FilterFindOneMarketItemInput>>;
	OR?: InputMaybe<Array<FilterFindOneMarketItemInput>>;
	_id?: InputMaybe<Scalars["Int"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterFindOneMarketItemOperatorsInput>;
	animationUrl?: InputMaybe<Scalars["String"]>;
	attributes?: InputMaybe<Array<InputMaybe<FilterFindOneMarketItemAttributesInput>>>;
	createdAt?: InputMaybe<Scalars["Date"]>;
	creator?: InputMaybe<Scalars["String"]>;
	description?: InputMaybe<Scalars["String"]>;
	externalUrl?: InputMaybe<Scalars["String"]>;
	image?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Scalars["Float"]>;
	name?: InputMaybe<Scalars["String"]>;
	owner?: InputMaybe<Scalars["String"]>;
	price?: InputMaybe<Scalars["String"]>;
	seller?: InputMaybe<Scalars["String"]>;
	sold?: InputMaybe<Scalars["Boolean"]>;
	thumbnail?: InputMaybe<Scalars["String"]>;
	tokenId?: InputMaybe<Scalars["Float"]>;
	tokenURI?: InputMaybe<Scalars["String"]>;
	updatedAt?: InputMaybe<Scalars["Date"]>;
	youtubeUrl?: InputMaybe<Scalars["String"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneMarketItemOperatorsInput = {
	_id?: InputMaybe<FilterFindOneMarketItem_IdOperatorsInput>;
};

export type FilterFindOneMarketItem_IdOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["Int"]>;
	gte?: InputMaybe<Scalars["Int"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
	lt?: InputMaybe<Scalars["Int"]>;
	lte?: InputMaybe<Scalars["Int"]>;
	ne?: InputMaybe<Scalars["Int"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
};

export type FilterFindOneUserInput = {
	AND?: InputMaybe<Array<FilterFindOneUserInput>>;
	OR?: InputMaybe<Array<FilterFindOneUserInput>>;
	_id?: InputMaybe<Scalars["MongoID"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterFindOneUserOperatorsInput>;
	account?: InputMaybe<Scalars["String"]>;
	cover?: InputMaybe<Scalars["String"]>;
	createdAt?: InputMaybe<Scalars["Date"]>;
	favourites?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	icon?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	planimetry?: InputMaybe<FilterFindOneUserPlanimetryInput>;
	updatedAt?: InputMaybe<Scalars["Date"]>;
	username?: InputMaybe<Scalars["String"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneUserOperatorsInput = {
	_id?: InputMaybe<FilterFindOneUser_IdOperatorsInput>;
};

export type FilterFindOneUserPlanimetryInput = {
	type?: InputMaybe<Scalars["JSON"]>;
};

export type FilterFindOneUser_IdOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["MongoID"]>;
	gte?: InputMaybe<Scalars["MongoID"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["MongoID"]>>>;
	lt?: InputMaybe<Scalars["MongoID"]>;
	lte?: InputMaybe<Scalars["MongoID"]>;
	ne?: InputMaybe<Scalars["MongoID"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["MongoID"]>>>;
};

export type MarketItem = {
	__typename?: "MarketItem";
	_id: Scalars["Int"];
	animationUrl?: Maybe<Scalars["String"]>;
	attributes?: Maybe<Array<Maybe<MarketItemAttributes>>>;
	createdAt?: Maybe<Scalars["Date"]>;
	creator: Scalars["String"];
	description: Scalars["String"];
	externalUrl?: Maybe<Scalars["String"]>;
	image: Scalars["String"];
	isFavourited?: Maybe<Scalars["Boolean"]>;
	isLiked?: Maybe<Scalars["Boolean"]>;
	likes?: Maybe<Scalars["Float"]>;
	name: Scalars["String"];
	owner: Scalars["String"];
	price: Scalars["String"];
	/** Price formatted */
	priceFormatted?: Maybe<Scalars["Float"]>;
	seller: Scalars["String"];
	sold: Scalars["Boolean"];
	thumbnail?: Maybe<Scalars["String"]>;
	tokenId: Scalars["Float"];
	tokenURI: Scalars["String"];
	updatedAt?: Maybe<Scalars["Date"]>;
	youtubeUrl?: Maybe<Scalars["String"]>;
};

export type MarketItemAttributes = {
	__typename?: "MarketItemAttributes";
	_id?: Maybe<Scalars["MongoID"]>;
	displayType?: Maybe<Scalars["String"]>;
	traitType: Scalars["String"];
	value: Scalars["String"];
};

/** List of items with pagination. */
export type MarketItemPagination = {
	__typename?: "MarketItemPagination";
	/** Total object count. */
	count?: Maybe<Scalars["Int"]>;
	/** Array of objects. */
	items?: Maybe<Array<MarketItem>>;
	/** Information to aid in pagination. */
	pageInfo: PaginationInfo;
};

export type MongoError = ErrorInterface & {
	__typename?: "MongoError";
	/** MongoDB error code */
	code?: Maybe<Scalars["Int"]>;
	/** MongoDB error message */
	message?: Maybe<Scalars["String"]>;
};

export type Mutation = {
	__typename?: "Mutation";
	addToFavourites?: Maybe<MarketItem>;
	dislike?: Maybe<MarketItem>;
	like?: Maybe<MarketItem>;
	removeFromFavourites?: Maybe<MarketItem>;
	/**
	 * Update one document: 1) Retrieve one document by findById. 2) Apply updates to
	 * mongoose document. 3) Mongoose applies defaults, setters, hooks and
	 * validation. 4) And save it.
	 */
	userUpdate?: Maybe<UpdateByIdUserPayload>;
	userUpdatePlanimetry?: Maybe<User>;
};

export type MutationAddToFavouritesArgs = {
	tokenId?: InputMaybe<Scalars["Int"]>;
};

export type MutationDislikeArgs = {
	tokenId?: InputMaybe<Scalars["Int"]>;
};

export type MutationLikeArgs = {
	tokenId?: InputMaybe<Scalars["Int"]>;
};

export type MutationRemoveFromFavouritesArgs = {
	tokenId?: InputMaybe<Scalars["Int"]>;
};

export type MutationUserUpdateArgs = {
	_id: Scalars["MongoID"];
	record: UpdateByIdUserInput;
};

export type MutationUserUpdatePlanimetryArgs = {
	planimetry?: InputMaybe<Scalars["JSON"]>;
};

export type PaginationInfo = {
	__typename?: "PaginationInfo";
	currentPage: Scalars["Int"];
	hasNextPage?: Maybe<Scalars["Boolean"]>;
	hasPreviousPage?: Maybe<Scalars["Boolean"]>;
	itemCount?: Maybe<Scalars["Int"]>;
	pageCount?: Maybe<Scalars["Int"]>;
	perPage: Scalars["Int"];
};

export type Query = {
	__typename?: "Query";
	marketItem?: Maybe<MarketItem>;
	marketItems: Array<MarketItem>;
	marketItemsCount?: Maybe<Scalars["Int"]>;
	marketItemsPagination?: Maybe<MarketItemPagination>;
	user?: Maybe<User>;
	users: Array<User>;
	usersCount?: Maybe<Scalars["Int"]>;
	usersPagination?: Maybe<UserPagination>;
};

export type QueryMarketItemArgs = {
	filter?: InputMaybe<FilterFindOneMarketItemInput>;
	skip?: InputMaybe<Scalars["Int"]>;
	sort?: InputMaybe<SortFindOneMarketItemInput>;
};

export type QueryMarketItemsArgs = {
	filter?: InputMaybe<FilterFindManyMarketItemInput>;
	limit?: InputMaybe<Scalars["Int"]>;
	skip?: InputMaybe<Scalars["Int"]>;
	sort?: InputMaybe<SortFindManyMarketItemInput>;
};

export type QueryMarketItemsCountArgs = {
	filter?: InputMaybe<FilterCountMarketItemInput>;
};

export type QueryMarketItemsPaginationArgs = {
	filter?: InputMaybe<FilterFindManyMarketItemInput>;
	page?: InputMaybe<Scalars["Int"]>;
	perPage?: InputMaybe<Scalars["Int"]>;
	sort?: InputMaybe<SortFindManyMarketItemInput>;
};

export type QueryUserArgs = {
	filter?: InputMaybe<FilterFindOneUserInput>;
	skip?: InputMaybe<Scalars["Int"]>;
	sort?: InputMaybe<SortFindOneUserInput>;
};

export type QueryUsersArgs = {
	filter?: InputMaybe<FilterFindManyUserInput>;
	limit?: InputMaybe<Scalars["Int"]>;
	skip?: InputMaybe<Scalars["Int"]>;
	sort?: InputMaybe<SortFindManyUserInput>;
};

export type QueryUsersCountArgs = {
	filter?: InputMaybe<FilterCountUserInput>;
};

export type QueryUsersPaginationArgs = {
	filter?: InputMaybe<FilterFindManyUserInput>;
	page?: InputMaybe<Scalars["Int"]>;
	perPage?: InputMaybe<Scalars["Int"]>;
	sort?: InputMaybe<SortFindManyUserInput>;
};

export type RuntimeError = ErrorInterface & {
	__typename?: "RuntimeError";
	/** Runtime error message */
	message?: Maybe<Scalars["String"]>;
};

export enum SortFindManyMarketItemInput {
	IdAsc = "_ID_ASC",
	IdDesc = "_ID_DESC",
}

export enum SortFindManyUserInput {
	IdAsc = "_ID_ASC",
	IdDesc = "_ID_DESC",
}

export enum SortFindOneMarketItemInput {
	IdAsc = "_ID_ASC",
	IdDesc = "_ID_DESC",
}

export enum SortFindOneUserInput {
	IdAsc = "_ID_ASC",
	IdDesc = "_ID_DESC",
}

export type UpdateByIdUserInput = {
	account?: InputMaybe<Scalars["String"]>;
	cover?: InputMaybe<Scalars["String"]>;
	createdAt?: InputMaybe<Scalars["Date"]>;
	favourites?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	icon?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	planimetry?: InputMaybe<UpdateByIdUserPlanimetryInput>;
	updatedAt?: InputMaybe<Scalars["Date"]>;
	username?: InputMaybe<Scalars["String"]>;
};

export type UpdateByIdUserPayload = {
	__typename?: "UpdateByIdUserPayload";
	/**
	 * Error that may occur during operation. If you request this field in GraphQL
	 * query, you will receive typed error in payload; otherwise error will be
	 * provided in root `errors` field of GraphQL response.
	 */
	error?: Maybe<ErrorInterface>;
	/** Updated document */
	record?: Maybe<User>;
	/** Document ID */
	recordId?: Maybe<Scalars["MongoID"]>;
};

export type UpdateByIdUserPlanimetryInput = {
	type?: InputMaybe<Scalars["JSON"]>;
};

export type User = {
	__typename?: "User";
	_id: Scalars["MongoID"];
	account: Scalars["String"];
	cover?: Maybe<Scalars["String"]>;
	createdAt?: Maybe<Scalars["Date"]>;
	favourites?: Maybe<Array<Maybe<Scalars["Float"]>>>;
	icon?: Maybe<Scalars["String"]>;
	likes?: Maybe<Array<Maybe<Scalars["Float"]>>>;
	planimetry?: Maybe<Scalars["JSON"]>;
	updatedAt?: Maybe<Scalars["Date"]>;
	username: Scalars["String"];
};

/** List of items with pagination. */
export type UserPagination = {
	__typename?: "UserPagination";
	/** Total object count. */
	count?: Maybe<Scalars["Int"]>;
	/** Array of objects. */
	items?: Maybe<Array<User>>;
	/** Information to aid in pagination. */
	pageInfo: PaginationInfo;
};

export type ValidationError = ErrorInterface & {
	__typename?: "ValidationError";
	/** List of validator errors */
	errors?: Maybe<Array<ValidatorError>>;
	/** Combined error message from all validators */
	message?: Maybe<Scalars["String"]>;
};

export type ValidatorError = {
	__typename?: "ValidatorError";
	/**
	 * Input record idx in array which occurs the validation error. This `idx` is
	 * useful for createMany operation. For singular operations it always be 0. For
	 * *Many operations `idx` represents record index in array received from user.
	 */
	idx: Scalars["Int"];
	/** Validation error message */
	message?: Maybe<Scalars["String"]>;
	/** Source of the validation error from the model path */
	path?: Maybe<Scalars["String"]>;
	/** Field value which occurs the validation error */
	value?: Maybe<Scalars["JSON"]>;
};

export type AddToFavouritesMutationVariables = Exact<{
	tokenId?: InputMaybe<Scalars["Int"]>;
}>;

export type AddToFavouritesMutation = {
	__typename?: "Mutation";
	addToFavourites?: {__typename?: "MarketItem"; isFavourited?: boolean | null} | null;
};

export type DislikeMutationVariables = Exact<{
	tokenId?: InputMaybe<Scalars["Int"]>;
}>;

export type DislikeMutation = {
	__typename?: "Mutation";
	dislike?: {__typename?: "MarketItem"; likes?: number | null; isLiked?: boolean | null} | null;
};

export type LikeMutationVariables = Exact<{
	tokenId?: InputMaybe<Scalars["Int"]>;
}>;

export type LikeMutation = {
	__typename?: "Mutation";
	like?: {__typename?: "MarketItem"; likes?: number | null; isLiked?: boolean | null} | null;
};

export type RemoveFromFavouritesMutationVariables = Exact<{
	tokenId?: InputMaybe<Scalars["Int"]>;
}>;

export type RemoveFromFavouritesMutation = {
	__typename?: "Mutation";
	removeFromFavourites?: {__typename?: "MarketItem"; isFavourited?: boolean | null} | null;
};

export type UserUpdateMutationVariables = Exact<{
	id: Scalars["MongoID"];
	record: UpdateByIdUserInput;
}>;

export type UserUpdateMutation = {
	__typename?: "Mutation";
	userUpdate?: {
		__typename?: "UpdateByIdUserPayload";
		record?: {__typename?: "User"; username: string; account: string} | null;
		error?:
			| {__typename?: "MongoError"; message?: string | null; code?: number | null}
			| {__typename?: "RuntimeError"; message?: string | null}
			| {
					__typename?: "ValidationError";
					message?: string | null;
					errors?: Array<{
						__typename?: "ValidatorError";
						message?: string | null;
						path?: string | null;
						value?: any | null;
					}> | null;
			  }
			| null;
	} | null;
};

export type UserUpdatePlanimetryMutationVariables = Exact<{
	planimetry: Scalars["JSON"];
}>;

export type UserUpdatePlanimetryMutation = {
	__typename?: "Mutation";
	userUpdatePlanimetry?: {__typename?: "User"; planimetry?: any | null} | null;
};

export type MarketItemQueryVariables = Exact<{
	filter?: InputMaybe<FilterFindOneMarketItemInput>;
}>;

export type MarketItemQuery = {
	__typename?: "Query";
	marketItem?: {
		__typename?: "MarketItem";
		name: string;
		tokenId: number;
		tokenURI: string;
		creator: string;
		seller: string;
		owner: string;
		price: string;
		priceFormatted?: number | null;
		sold: boolean;
		description: string;
		externalUrl?: string | null;
		animationUrl?: string | null;
		youtubeUrl?: string | null;
		image: string;
		thumbnail?: string | null;
		likes?: number | null;
		isLiked?: boolean | null;
		isFavourited?: boolean | null;
		updatedAt?: any | null;
		createdAt?: any | null;
		attributes?: Array<{
			__typename?: "MarketItemAttributes";
			traitType: string;
			value: string;
			displayType?: string | null;
		} | null> | null;
	} | null;
};

export type MarketItemsQueryVariables = Exact<{
	filter?: InputMaybe<FilterFindManyMarketItemInput>;
	skip?: InputMaybe<Scalars["Int"]>;
	limit?: InputMaybe<Scalars["Int"]>;
	sort?: InputMaybe<SortFindManyMarketItemInput>;
}>;

export type MarketItemsQuery = {
	__typename?: "Query";
	marketItems: Array<{
		__typename?: "MarketItem";
		name: string;
		tokenId: number;
		tokenURI: string;
		creator: string;
		seller: string;
		owner: string;
		price: string;
		priceFormatted?: number | null;
		sold: boolean;
		description: string;
		externalUrl?: string | null;
		animationUrl?: string | null;
		youtubeUrl?: string | null;
		image: string;
		thumbnail?: string | null;
		likes?: number | null;
		isLiked?: boolean | null;
		isFavourited?: boolean | null;
		updatedAt?: any | null;
		createdAt?: any | null;
		attributes?: Array<{
			__typename?: "MarketItemAttributes";
			traitType: string;
			value: string;
			displayType?: string | null;
		} | null> | null;
	}>;
};

export type UserQueryVariables = Exact<{
	filter?: InputMaybe<FilterFindOneUserInput>;
}>;

export type UserQuery = {
	__typename?: "Query";
	user?: {
		__typename?: "User";
		_id: any;
		username: string;
		account: string;
		icon?: string | null;
		cover?: string | null;
		favourites?: Array<number | null> | null;
		likes?: Array<number | null> | null;
		planimetry?: any | null;
		createdAt?: any | null;
		updatedAt?: any | null;
	} | null;
};

export type UsersQueryVariables = Exact<{
	filter?: InputMaybe<FilterFindManyUserInput>;
	skip?: InputMaybe<Scalars["Int"]>;
	limit?: InputMaybe<Scalars["Int"]>;
	sort?: InputMaybe<SortFindManyUserInput>;
}>;

export type UsersQuery = {
	__typename?: "Query";
	users: Array<{
		__typename?: "User";
		_id: any;
		username: string;
		account: string;
		icon?: string | null;
		cover?: string | null;
		favourites?: Array<number | null> | null;
		likes?: Array<number | null> | null;
		planimetry?: any | null;
		createdAt?: any | null;
		updatedAt?: any | null;
	}>;
};

export const AddToFavouritesDocument = gql`
	mutation AddToFavourites($tokenId: Int) {
		addToFavourites(tokenId: $tokenId) {
			isFavourited
		}
	}
`;
export type AddToFavouritesMutationFn = Apollo.MutationFunction<
	AddToFavouritesMutation,
	AddToFavouritesMutationVariables
>;

/**
 * __useAddToFavouritesMutation__
 *
 * To run a mutation, you first call `useAddToFavouritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToFavouritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToFavouritesMutation, { data, loading, error }] = useAddToFavouritesMutation({
 *   variables: {
 *      tokenId: // value for 'tokenId'
 *   },
 * });
 */
export function useAddToFavouritesMutation(
	baseOptions?: Apollo.MutationHookOptions<
		AddToFavouritesMutation,
		AddToFavouritesMutationVariables
	>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useMutation<AddToFavouritesMutation, AddToFavouritesMutationVariables>(
		AddToFavouritesDocument,
		options,
	);
}
export type AddToFavouritesMutationHookResult = ReturnType<typeof useAddToFavouritesMutation>;
export type AddToFavouritesMutationResult = Apollo.MutationResult<AddToFavouritesMutation>;
export type AddToFavouritesMutationOptions = Apollo.BaseMutationOptions<
	AddToFavouritesMutation,
	AddToFavouritesMutationVariables
>;
export const DislikeDocument = gql`
	mutation Dislike($tokenId: Int) {
		dislike(tokenId: $tokenId) {
			likes
			isLiked
		}
	}
`;
export type DislikeMutationFn = Apollo.MutationFunction<DislikeMutation, DislikeMutationVariables>;

/**
 * __useDislikeMutation__
 *
 * To run a mutation, you first call `useDislikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDislikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dislikeMutation, { data, loading, error }] = useDislikeMutation({
 *   variables: {
 *      tokenId: // value for 'tokenId'
 *   },
 * });
 */
export function useDislikeMutation(
	baseOptions?: Apollo.MutationHookOptions<DislikeMutation, DislikeMutationVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useMutation<DislikeMutation, DislikeMutationVariables>(DislikeDocument, options);
}
export type DislikeMutationHookResult = ReturnType<typeof useDislikeMutation>;
export type DislikeMutationResult = Apollo.MutationResult<DislikeMutation>;
export type DislikeMutationOptions = Apollo.BaseMutationOptions<
	DislikeMutation,
	DislikeMutationVariables
>;
export const LikeDocument = gql`
	mutation Like($tokenId: Int) {
		like(tokenId: $tokenId) {
			likes
			isLiked
		}
	}
`;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      tokenId: // value for 'tokenId'
 *   },
 * });
 */
export function useLikeMutation(
	baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, options);
}
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
export const RemoveFromFavouritesDocument = gql`
	mutation RemoveFromFavourites($tokenId: Int) {
		removeFromFavourites(tokenId: $tokenId) {
			isFavourited
		}
	}
`;
export type RemoveFromFavouritesMutationFn = Apollo.MutationFunction<
	RemoveFromFavouritesMutation,
	RemoveFromFavouritesMutationVariables
>;

/**
 * __useRemoveFromFavouritesMutation__
 *
 * To run a mutation, you first call `useRemoveFromFavouritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromFavouritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromFavouritesMutation, { data, loading, error }] = useRemoveFromFavouritesMutation({
 *   variables: {
 *      tokenId: // value for 'tokenId'
 *   },
 * });
 */
export function useRemoveFromFavouritesMutation(
	baseOptions?: Apollo.MutationHookOptions<
		RemoveFromFavouritesMutation,
		RemoveFromFavouritesMutationVariables
	>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useMutation<RemoveFromFavouritesMutation, RemoveFromFavouritesMutationVariables>(
		RemoveFromFavouritesDocument,
		options,
	);
}
export type RemoveFromFavouritesMutationHookResult = ReturnType<
	typeof useRemoveFromFavouritesMutation
>;
export type RemoveFromFavouritesMutationResult =
	Apollo.MutationResult<RemoveFromFavouritesMutation>;
export type RemoveFromFavouritesMutationOptions = Apollo.BaseMutationOptions<
	RemoveFromFavouritesMutation,
	RemoveFromFavouritesMutationVariables
>;
export const UserUpdateDocument = gql`
	mutation UserUpdate($id: MongoID!, $record: UpdateByIdUserInput!) {
		userUpdate(_id: $id, record: $record) {
			record {
				username
				account
			}
			error {
				message
				... on ValidationError {
					message
					errors {
						message
						path
						value
					}
				}
				... on MongoError {
					message
					code
				}
				... on RuntimeError {
					message
				}
			}
		}
	}
`;
export type UserUpdateMutationFn = Apollo.MutationFunction<
	UserUpdateMutation,
	UserUpdateMutationVariables
>;

/**
 * __useUserUpdateMutation__
 *
 * To run a mutation, you first call `useUserUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateMutation, { data, loading, error }] = useUserUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      record: // value for 'record'
 *   },
 * });
 */
export function useUserUpdateMutation(
	baseOptions?: Apollo.MutationHookOptions<UserUpdateMutation, UserUpdateMutationVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useMutation<UserUpdateMutation, UserUpdateMutationVariables>(
		UserUpdateDocument,
		options,
	);
}
export type UserUpdateMutationHookResult = ReturnType<typeof useUserUpdateMutation>;
export type UserUpdateMutationResult = Apollo.MutationResult<UserUpdateMutation>;
export type UserUpdateMutationOptions = Apollo.BaseMutationOptions<
	UserUpdateMutation,
	UserUpdateMutationVariables
>;
export const UserUpdatePlanimetryDocument = gql`
	mutation UserUpdatePlanimetry($planimetry: JSON!) {
		userUpdatePlanimetry(planimetry: $planimetry) {
			planimetry
		}
	}
`;
export type UserUpdatePlanimetryMutationFn = Apollo.MutationFunction<
	UserUpdatePlanimetryMutation,
	UserUpdatePlanimetryMutationVariables
>;

/**
 * __useUserUpdatePlanimetryMutation__
 *
 * To run a mutation, you first call `useUserUpdatePlanimetryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdatePlanimetryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdatePlanimetryMutation, { data, loading, error }] = useUserUpdatePlanimetryMutation({
 *   variables: {
 *      planimetry: // value for 'planimetry'
 *   },
 * });
 */
export function useUserUpdatePlanimetryMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UserUpdatePlanimetryMutation,
		UserUpdatePlanimetryMutationVariables
	>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useMutation<UserUpdatePlanimetryMutation, UserUpdatePlanimetryMutationVariables>(
		UserUpdatePlanimetryDocument,
		options,
	);
}
export type UserUpdatePlanimetryMutationHookResult = ReturnType<
	typeof useUserUpdatePlanimetryMutation
>;
export type UserUpdatePlanimetryMutationResult =
	Apollo.MutationResult<UserUpdatePlanimetryMutation>;
export type UserUpdatePlanimetryMutationOptions = Apollo.BaseMutationOptions<
	UserUpdatePlanimetryMutation,
	UserUpdatePlanimetryMutationVariables
>;
export const MarketItemDocument = gql`
	query MarketItem($filter: FilterFindOneMarketItemInput) {
		marketItem(filter: $filter) {
			name
			tokenId
			tokenURI
			creator
			seller
			owner
			price
			priceFormatted
			sold
			description
			externalUrl
			animationUrl
			youtubeUrl
			attributes {
				traitType
				value
				displayType
			}
			image
			thumbnail
			likes
			isLiked
			isFavourited
			updatedAt
			createdAt
		}
	}
`;

/**
 * __useMarketItemQuery__
 *
 * To run a query within a React component, call `useMarketItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketItemQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useMarketItemQuery(
	baseOptions?: Apollo.QueryHookOptions<MarketItemQuery, MarketItemQueryVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useQuery<MarketItemQuery, MarketItemQueryVariables>(MarketItemDocument, options);
}
export function useMarketItemLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<MarketItemQuery, MarketItemQueryVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useLazyQuery<MarketItemQuery, MarketItemQueryVariables>(
		MarketItemDocument,
		options,
	);
}
export type MarketItemQueryHookResult = ReturnType<typeof useMarketItemQuery>;
export type MarketItemLazyQueryHookResult = ReturnType<typeof useMarketItemLazyQuery>;
export type MarketItemQueryResult = Apollo.QueryResult<MarketItemQuery, MarketItemQueryVariables>;
export const MarketItemsDocument = gql`
	query MarketItems(
		$filter: FilterFindManyMarketItemInput
		$skip: Int
		$limit: Int
		$sort: SortFindManyMarketItemInput
	) {
		marketItems(filter: $filter, skip: $skip, limit: $limit, sort: $sort) {
			name
			tokenId
			tokenURI
			creator
			seller
			owner
			price
			priceFormatted
			sold
			description
			externalUrl
			animationUrl
			youtubeUrl
			attributes {
				traitType
				value
				displayType
			}
			image
			thumbnail
			likes
			isLiked
			isFavourited
			updatedAt
			createdAt
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
 *      filter: // value for 'filter'
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *      sort: // value for 'sort'
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
export const UserDocument = gql`
	query User($filter: FilterFindOneUserInput) {
		user(filter: $filter) {
			_id
			username
			account
			icon
			cover
			favourites
			likes
			planimetry
			createdAt
			updatedAt
		}
	}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
	query Users(
		$filter: FilterFindManyUserInput
		$skip: Int
		$limit: Int
		$sort: SortFindManyUserInput
	) {
		users(filter: $filter, skip: $skip, limit: $limit, sort: $sort) {
			_id
			username
			account
			icon
			cover
			favourites
			likes
			planimetry
			createdAt
			updatedAt
		}
	}
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useUsersQuery(
	baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export function useUsersLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
