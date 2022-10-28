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
	/**
	 * The string representation of JavaScript regexp. You may provide it with flags
	 * "/^abc.*\/i" or without flags like "^abc.*". More info about RegExp characters and flags: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
	 */
	RegExpAsString: any;
};

export type ErrorInterface = {
	/** Generic error message */
	message?: Maybe<Scalars["String"]>;
};

export type FilterCountMarketItemAttributesInput = {
	_id?: InputMaybe<Scalars["MongoID"]>;
	display_type?: InputMaybe<Scalars["String"]>;
	trait_type?: InputMaybe<Scalars["String"]>;
	value?: InputMaybe<Scalars["String"]>;
};

export type FilterCountMarketItemDescriptionOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["String"]>;
	gte?: InputMaybe<Scalars["String"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	lt?: InputMaybe<Scalars["String"]>;
	lte?: InputMaybe<Scalars["String"]>;
	ne?: InputMaybe<Scalars["String"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	regex?: InputMaybe<Scalars["RegExpAsString"]>;
};

export type FilterCountMarketItemInput = {
	AND?: InputMaybe<Array<FilterCountMarketItemInput>>;
	OR?: InputMaybe<Array<FilterCountMarketItemInput>>;
	_id?: InputMaybe<Scalars["Int"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterCountMarketItemOperatorsInput>;
	animation_url?: InputMaybe<Scalars["String"]>;
	attributes?: InputMaybe<Array<InputMaybe<FilterCountMarketItemAttributesInput>>>;
	created_at?: InputMaybe<Scalars["Date"]>;
	creator?: InputMaybe<Scalars["String"]>;
	description?: InputMaybe<Scalars["String"]>;
	external_url?: InputMaybe<Scalars["String"]>;
	image?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Scalars["Float"]>;
	name?: InputMaybe<Scalars["String"]>;
	owner_of?: InputMaybe<Scalars["String"]>;
	price?: InputMaybe<Scalars["String"]>;
	price_formatted?: InputMaybe<Scalars["String"]>;
	search?: InputMaybe<Scalars["String"]>;
	seller?: InputMaybe<Scalars["String"]>;
	sold?: InputMaybe<Scalars["Boolean"]>;
	thumbnail?: InputMaybe<Scalars["String"]>;
	token_address?: InputMaybe<Scalars["String"]>;
	token_id?: InputMaybe<Scalars["Float"]>;
	token_uri?: InputMaybe<Scalars["String"]>;
	updated_at?: InputMaybe<Scalars["Date"]>;
	youtube_url?: InputMaybe<Scalars["String"]>;
};

export type FilterCountMarketItemNameOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["String"]>;
	gte?: InputMaybe<Scalars["String"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	lt?: InputMaybe<Scalars["String"]>;
	lte?: InputMaybe<Scalars["String"]>;
	ne?: InputMaybe<Scalars["String"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	regex?: InputMaybe<Scalars["RegExpAsString"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountMarketItemOperatorsInput = {
	_id?: InputMaybe<FilterCountMarketItem_IdOperatorsInput>;
	description?: InputMaybe<FilterCountMarketItemDescriptionOperatorsInput>;
	name?: InputMaybe<FilterCountMarketItemNameOperatorsInput>;
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

export type FilterCountUserAccountOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["String"]>;
	gte?: InputMaybe<Scalars["String"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	lt?: InputMaybe<Scalars["String"]>;
	lte?: InputMaybe<Scalars["String"]>;
	ne?: InputMaybe<Scalars["String"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	regex?: InputMaybe<Scalars["RegExpAsString"]>;
};

export type FilterCountUserInput = {
	AND?: InputMaybe<Array<FilterCountUserInput>>;
	OR?: InputMaybe<Array<FilterCountUserInput>>;
	_id?: InputMaybe<Scalars["MongoID"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterCountUserOperatorsInput>;
	account?: InputMaybe<Scalars["String"]>;
	cover?: InputMaybe<Scalars["String"]>;
	created_at?: InputMaybe<Scalars["Date"]>;
	favourites?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	icon?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	planimetry?: InputMaybe<FilterCountUserPlanimetryInput>;
	search?: InputMaybe<Scalars["String"]>;
	updated_at?: InputMaybe<Scalars["Date"]>;
	username?: InputMaybe<Scalars["String"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountUserOperatorsInput = {
	_id?: InputMaybe<FilterCountUser_IdOperatorsInput>;
	account?: InputMaybe<FilterCountUserAccountOperatorsInput>;
	username?: InputMaybe<FilterCountUserUsernameOperatorsInput>;
};

export type FilterCountUserPlanimetryInput = {
	type?: InputMaybe<Scalars["JSON"]>;
};

export type FilterCountUserUsernameOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["String"]>;
	gte?: InputMaybe<Scalars["String"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	lt?: InputMaybe<Scalars["String"]>;
	lte?: InputMaybe<Scalars["String"]>;
	ne?: InputMaybe<Scalars["String"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	regex?: InputMaybe<Scalars["RegExpAsString"]>;
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
	display_type?: InputMaybe<Scalars["String"]>;
	trait_type?: InputMaybe<Scalars["String"]>;
	value?: InputMaybe<Scalars["String"]>;
};

export type FilterFindManyMarketItemDescriptionOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["String"]>;
	gte?: InputMaybe<Scalars["String"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	lt?: InputMaybe<Scalars["String"]>;
	lte?: InputMaybe<Scalars["String"]>;
	ne?: InputMaybe<Scalars["String"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	regex?: InputMaybe<Scalars["RegExpAsString"]>;
};

export type FilterFindManyMarketItemInput = {
	AND?: InputMaybe<Array<FilterFindManyMarketItemInput>>;
	OR?: InputMaybe<Array<FilterFindManyMarketItemInput>>;
	_id?: InputMaybe<Scalars["Int"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterFindManyMarketItemOperatorsInput>;
	animation_url?: InputMaybe<Scalars["String"]>;
	attributes?: InputMaybe<Array<InputMaybe<FilterFindManyMarketItemAttributesInput>>>;
	created_at?: InputMaybe<Scalars["Date"]>;
	creator?: InputMaybe<Scalars["String"]>;
	description?: InputMaybe<Scalars["String"]>;
	external_url?: InputMaybe<Scalars["String"]>;
	image?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Scalars["Float"]>;
	name?: InputMaybe<Scalars["String"]>;
	owner_of?: InputMaybe<Scalars["String"]>;
	price?: InputMaybe<Scalars["String"]>;
	price_formatted?: InputMaybe<Scalars["String"]>;
	search?: InputMaybe<Scalars["String"]>;
	seller?: InputMaybe<Scalars["String"]>;
	sold?: InputMaybe<Scalars["Boolean"]>;
	thumbnail?: InputMaybe<Scalars["String"]>;
	token_address?: InputMaybe<Scalars["String"]>;
	token_id?: InputMaybe<Scalars["Float"]>;
	token_uri?: InputMaybe<Scalars["String"]>;
	updated_at?: InputMaybe<Scalars["Date"]>;
	youtube_url?: InputMaybe<Scalars["String"]>;
};

export type FilterFindManyMarketItemNameOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["String"]>;
	gte?: InputMaybe<Scalars["String"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	lt?: InputMaybe<Scalars["String"]>;
	lte?: InputMaybe<Scalars["String"]>;
	ne?: InputMaybe<Scalars["String"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	regex?: InputMaybe<Scalars["RegExpAsString"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyMarketItemOperatorsInput = {
	_id?: InputMaybe<FilterFindManyMarketItem_IdOperatorsInput>;
	description?: InputMaybe<FilterFindManyMarketItemDescriptionOperatorsInput>;
	name?: InputMaybe<FilterFindManyMarketItemNameOperatorsInput>;
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

export type FilterFindManyUserAccountOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["String"]>;
	gte?: InputMaybe<Scalars["String"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	lt?: InputMaybe<Scalars["String"]>;
	lte?: InputMaybe<Scalars["String"]>;
	ne?: InputMaybe<Scalars["String"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	regex?: InputMaybe<Scalars["RegExpAsString"]>;
};

export type FilterFindManyUserInput = {
	AND?: InputMaybe<Array<FilterFindManyUserInput>>;
	OR?: InputMaybe<Array<FilterFindManyUserInput>>;
	_id?: InputMaybe<Scalars["MongoID"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterFindManyUserOperatorsInput>;
	account?: InputMaybe<Scalars["String"]>;
	cover?: InputMaybe<Scalars["String"]>;
	created_at?: InputMaybe<Scalars["Date"]>;
	favourites?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	icon?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	planimetry?: InputMaybe<FilterFindManyUserPlanimetryInput>;
	search?: InputMaybe<Scalars["String"]>;
	updated_at?: InputMaybe<Scalars["Date"]>;
	username?: InputMaybe<Scalars["String"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyUserOperatorsInput = {
	_id?: InputMaybe<FilterFindManyUser_IdOperatorsInput>;
	account?: InputMaybe<FilterFindManyUserAccountOperatorsInput>;
	username?: InputMaybe<FilterFindManyUserUsernameOperatorsInput>;
};

export type FilterFindManyUserPlanimetryInput = {
	type?: InputMaybe<Scalars["JSON"]>;
};

export type FilterFindManyUserUsernameOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["String"]>;
	gte?: InputMaybe<Scalars["String"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	lt?: InputMaybe<Scalars["String"]>;
	lte?: InputMaybe<Scalars["String"]>;
	ne?: InputMaybe<Scalars["String"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	regex?: InputMaybe<Scalars["RegExpAsString"]>;
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
	display_type?: InputMaybe<Scalars["String"]>;
	trait_type?: InputMaybe<Scalars["String"]>;
	value?: InputMaybe<Scalars["String"]>;
};

export type FilterFindOneMarketItemDescriptionOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["String"]>;
	gte?: InputMaybe<Scalars["String"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	lt?: InputMaybe<Scalars["String"]>;
	lte?: InputMaybe<Scalars["String"]>;
	ne?: InputMaybe<Scalars["String"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	regex?: InputMaybe<Scalars["RegExpAsString"]>;
};

export type FilterFindOneMarketItemInput = {
	AND?: InputMaybe<Array<FilterFindOneMarketItemInput>>;
	OR?: InputMaybe<Array<FilterFindOneMarketItemInput>>;
	_id?: InputMaybe<Scalars["Int"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterFindOneMarketItemOperatorsInput>;
	animation_url?: InputMaybe<Scalars["String"]>;
	attributes?: InputMaybe<Array<InputMaybe<FilterFindOneMarketItemAttributesInput>>>;
	created_at?: InputMaybe<Scalars["Date"]>;
	creator?: InputMaybe<Scalars["String"]>;
	description?: InputMaybe<Scalars["String"]>;
	external_url?: InputMaybe<Scalars["String"]>;
	image?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Scalars["Float"]>;
	name?: InputMaybe<Scalars["String"]>;
	owner_of?: InputMaybe<Scalars["String"]>;
	price?: InputMaybe<Scalars["String"]>;
	price_formatted?: InputMaybe<Scalars["String"]>;
	seller?: InputMaybe<Scalars["String"]>;
	sold?: InputMaybe<Scalars["Boolean"]>;
	thumbnail?: InputMaybe<Scalars["String"]>;
	token_address?: InputMaybe<Scalars["String"]>;
	token_id?: InputMaybe<Scalars["Float"]>;
	token_uri?: InputMaybe<Scalars["String"]>;
	updated_at?: InputMaybe<Scalars["Date"]>;
	youtube_url?: InputMaybe<Scalars["String"]>;
};

export type FilterFindOneMarketItemNameOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["String"]>;
	gte?: InputMaybe<Scalars["String"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	lt?: InputMaybe<Scalars["String"]>;
	lte?: InputMaybe<Scalars["String"]>;
	ne?: InputMaybe<Scalars["String"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	regex?: InputMaybe<Scalars["RegExpAsString"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneMarketItemOperatorsInput = {
	_id?: InputMaybe<FilterFindOneMarketItem_IdOperatorsInput>;
	description?: InputMaybe<FilterFindOneMarketItemDescriptionOperatorsInput>;
	name?: InputMaybe<FilterFindOneMarketItemNameOperatorsInput>;
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

export type FilterFindOneUserAccountOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["String"]>;
	gte?: InputMaybe<Scalars["String"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	lt?: InputMaybe<Scalars["String"]>;
	lte?: InputMaybe<Scalars["String"]>;
	ne?: InputMaybe<Scalars["String"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	regex?: InputMaybe<Scalars["RegExpAsString"]>;
};

export type FilterFindOneUserInput = {
	AND?: InputMaybe<Array<FilterFindOneUserInput>>;
	OR?: InputMaybe<Array<FilterFindOneUserInput>>;
	_id?: InputMaybe<Scalars["MongoID"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterFindOneUserOperatorsInput>;
	account?: InputMaybe<Scalars["String"]>;
	cover?: InputMaybe<Scalars["String"]>;
	created_at?: InputMaybe<Scalars["Date"]>;
	favourites?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	icon?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	planimetry?: InputMaybe<FilterFindOneUserPlanimetryInput>;
	updated_at?: InputMaybe<Scalars["Date"]>;
	username?: InputMaybe<Scalars["String"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneUserOperatorsInput = {
	_id?: InputMaybe<FilterFindOneUser_IdOperatorsInput>;
	account?: InputMaybe<FilterFindOneUserAccountOperatorsInput>;
	username?: InputMaybe<FilterFindOneUserUsernameOperatorsInput>;
};

export type FilterFindOneUserPlanimetryInput = {
	type?: InputMaybe<Scalars["JSON"]>;
};

export type FilterFindOneUserUsernameOperatorsInput = {
	exists?: InputMaybe<Scalars["Boolean"]>;
	gt?: InputMaybe<Scalars["String"]>;
	gte?: InputMaybe<Scalars["String"]>;
	in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	lt?: InputMaybe<Scalars["String"]>;
	lte?: InputMaybe<Scalars["String"]>;
	ne?: InputMaybe<Scalars["String"]>;
	nin?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	regex?: InputMaybe<Scalars["RegExpAsString"]>;
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
	animation_url?: Maybe<Scalars["String"]>;
	attributes?: Maybe<Array<Maybe<MarketItemAttributes>>>;
	created_at?: Maybe<Scalars["Date"]>;
	creator: Scalars["String"];
	description: Scalars["String"];
	external_url?: Maybe<Scalars["String"]>;
	image: Scalars["String"];
	is_favourited?: Maybe<Scalars["Boolean"]>;
	is_liked?: Maybe<Scalars["Boolean"]>;
	likes?: Maybe<Scalars["Float"]>;
	name: Scalars["String"];
	owner_of: Scalars["String"];
	price: Scalars["String"];
	/** Price formatted */
	price_formatted?: Maybe<Scalars["Float"]>;
	seller: Scalars["String"];
	sold: Scalars["Boolean"];
	thumbnail?: Maybe<Scalars["String"]>;
	token_address: Scalars["String"];
	token_id: Scalars["Float"];
	token_uri: Scalars["String"];
	updated_at?: Maybe<Scalars["Date"]>;
	youtube_url?: Maybe<Scalars["String"]>;
};

export type MarketItemAttributes = {
	__typename?: "MarketItemAttributes";
	_id?: Maybe<Scalars["MongoID"]>;
	display_type?: Maybe<Scalars["String"]>;
	trait_type: Scalars["String"];
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
	token_id?: InputMaybe<Scalars["Int"]>;
};

export type MutationDislikeArgs = {
	token_id?: InputMaybe<Scalars["Int"]>;
};

export type MutationLikeArgs = {
	token_id?: InputMaybe<Scalars["Int"]>;
};

export type MutationRemoveFromFavouritesArgs = {
	token_id?: InputMaybe<Scalars["Int"]>;
};

export type MutationUserUpdateArgs = {
	_id: Scalars["MongoID"];
	record: UpdateByIdUserInput;
};

export type MutationUserUpdatePlanimetryArgs = {
	planimetry?: InputMaybe<Scalars["JSON"]>;
};

export type Nft = {
	__typename?: "NFT";
	amount?: Maybe<Scalars["String"]>;
	animation_url?: Maybe<Scalars["String"]>;
	attributes?: Maybe<Scalars["JSON"]>;
	block_number?: Maybe<Scalars["String"]>;
	block_number_minted?: Maybe<Scalars["String"]>;
	contract_type?: Maybe<Scalars["String"]>;
	description?: Maybe<Scalars["String"]>;
	external_url?: Maybe<Scalars["String"]>;
	image?: Maybe<Scalars["String"]>;
	last_metadata_sync?: Maybe<Scalars["String"]>;
	last_token_uri_sync?: Maybe<Scalars["String"]>;
	name?: Maybe<Scalars["String"]>;
	owner_of?: Maybe<Scalars["String"]>;
	symbol?: Maybe<Scalars["String"]>;
	thumbnail?: Maybe<Scalars["String"]>;
	token_address: Scalars["String"];
	token_hash?: Maybe<Scalars["String"]>;
	token_id: Scalars["String"];
	token_uri?: Maybe<Scalars["String"]>;
	youtube_url?: Maybe<Scalars["String"]>;
};

export type NftTransfer = {
	__typename?: "NFTTransfer";
	amount?: Maybe<Scalars["String"]>;
	block_hash?: Maybe<Scalars["String"]>;
	block_number?: Maybe<Scalars["String"]>;
	block_timestamp?: Maybe<Scalars["String"]>;
	contract_type?: Maybe<Scalars["String"]>;
	from_address: Scalars["String"];
	log_index?: Maybe<Scalars["Int"]>;
	operator?: Maybe<Scalars["String"]>;
	to_address: Scalars["String"];
	token_address: Scalars["String"];
	token_id: Scalars["String"];
	transaction_hash?: Maybe<Scalars["String"]>;
	transaction_index?: Maybe<Scalars["Int"]>;
	transaction_type?: Maybe<Scalars["String"]>;
	value?: Maybe<Scalars["String"]>;
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
	/** Get NFT owned by a given address and token. */
	accountNFT?: Maybe<Nft>;
	marketItem?: Maybe<MarketItem>;
	marketItems: Array<MarketItem>;
	marketItemsCount?: Maybe<Scalars["Int"]>;
	marketItemsPagination?: Maybe<MarketItemPagination>;
	user?: Maybe<User>;
	users: Array<User>;
	usersCount?: Maybe<Scalars["Int"]>;
	usersPagination?: Maybe<UserPagination>;
	/** Get transfers of NFTs given the wallet and other parameters. */
	walletNFTTransfers?: Maybe<Array<Maybe<NftTransfer>>>;
	/** Get NFTs owned by a given address. */
	walletNFTs?: Maybe<Array<Maybe<Nft>>>;
};

export type QueryAccountNftArgs = {
	address: Scalars["String"];
	chain: Scalars["String"];
	token_address?: InputMaybe<Scalars["String"]>;
	token_id?: InputMaybe<Scalars["Int"]>;
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

export type QueryWalletNftTransfersArgs = {
	address: Scalars["String"];
	chain: Scalars["String"];
};

export type QueryWalletNfTsArgs = {
	address: Scalars["String"];
	chain: Scalars["String"];
	token_address?: InputMaybe<Scalars["String"]>;
};

export type RuntimeError = ErrorInterface & {
	__typename?: "RuntimeError";
	/** Runtime error message */
	message?: Maybe<Scalars["String"]>;
};

export enum SortFindManyMarketItemInput {
	DescriptionAsc = "DESCRIPTION_ASC",
	DescriptionDesc = "DESCRIPTION_DESC",
	NameAsc = "NAME_ASC",
	NameDesc = "NAME_DESC",
	IdAsc = "_ID_ASC",
	IdDesc = "_ID_DESC",
}

export enum SortFindManyUserInput {
	AccountAsc = "ACCOUNT_ASC",
	AccountDesc = "ACCOUNT_DESC",
	UsernameAsc = "USERNAME_ASC",
	UsernameDesc = "USERNAME_DESC",
	IdAsc = "_ID_ASC",
	IdDesc = "_ID_DESC",
}

export enum SortFindOneMarketItemInput {
	DescriptionAsc = "DESCRIPTION_ASC",
	DescriptionDesc = "DESCRIPTION_DESC",
	NameAsc = "NAME_ASC",
	NameDesc = "NAME_DESC",
	IdAsc = "_ID_ASC",
	IdDesc = "_ID_DESC",
}

export enum SortFindOneUserInput {
	AccountAsc = "ACCOUNT_ASC",
	AccountDesc = "ACCOUNT_DESC",
	UsernameAsc = "USERNAME_ASC",
	UsernameDesc = "USERNAME_DESC",
	IdAsc = "_ID_ASC",
	IdDesc = "_ID_DESC",
}

export type UpdateByIdUserInput = {
	account?: InputMaybe<Scalars["String"]>;
	cover?: InputMaybe<Scalars["String"]>;
	created_at?: InputMaybe<Scalars["Date"]>;
	favourites?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	icon?: InputMaybe<Scalars["String"]>;
	likes?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
	planimetry?: InputMaybe<UpdateByIdUserPlanimetryInput>;
	updated_at?: InputMaybe<Scalars["Date"]>;
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
	created_at?: Maybe<Scalars["Date"]>;
	favourites?: Maybe<Array<Maybe<Scalars["Float"]>>>;
	icon?: Maybe<Scalars["String"]>;
	likes?: Maybe<Array<Maybe<Scalars["Float"]>>>;
	planimetry?: Maybe<Scalars["JSON"]>;
	updated_at?: Maybe<Scalars["Date"]>;
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
	token_id?: InputMaybe<Scalars["Int"]>;
}>;

export type AddToFavouritesMutation = {
	__typename?: "Mutation";
	addToFavourites?: {__typename?: "MarketItem"; is_favourited?: boolean | null} | null;
};

export type DislikeMutationVariables = Exact<{
	token_id?: InputMaybe<Scalars["Int"]>;
}>;

export type DislikeMutation = {
	__typename?: "Mutation";
	dislike?: {__typename?: "MarketItem"; likes?: number | null; is_liked?: boolean | null} | null;
};

export type LikeMutationVariables = Exact<{
	token_id?: InputMaybe<Scalars["Int"]>;
}>;

export type LikeMutation = {
	__typename?: "Mutation";
	like?: {__typename?: "MarketItem"; likes?: number | null; is_liked?: boolean | null} | null;
};

export type RemoveFromFavouritesMutationVariables = Exact<{
	token_id?: InputMaybe<Scalars["Int"]>;
}>;

export type RemoveFromFavouritesMutation = {
	__typename?: "Mutation";
	removeFromFavourites?: {__typename?: "MarketItem"; is_favourited?: boolean | null} | null;
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

export type AccountNftQueryVariables = Exact<{
	chain: Scalars["String"];
	address: Scalars["String"];
	token_address: Scalars["String"];
	token_id: Scalars["Int"];
}>;

export type AccountNftQuery = {
	__typename?: "Query";
	accountNFT?: {
		__typename?: "NFT";
		token_address: string;
		token_id: string;
		contract_type?: string | null;
		owner_of?: string | null;
		block_number?: string | null;
		block_number_minted?: string | null;
		token_uri?: string | null;
		name?: string | null;
		amount?: string | null;
		symbol?: string | null;
		token_hash?: string | null;
		last_token_uri_sync?: string | null;
		last_metadata_sync?: string | null;
		description?: string | null;
		image?: string | null;
		thumbnail?: string | null;
		attributes?: any | null;
		external_url?: string | null;
		animation_url?: string | null;
		youtube_url?: string | null;
	} | null;
};

export type MarketItemQueryVariables = Exact<{
	filter?: InputMaybe<FilterFindOneMarketItemInput>;
}>;

export type MarketItemQuery = {
	__typename?: "Query";
	marketItem?: {
		__typename?: "MarketItem";
		_id: number;
		name: string;
		token_address: string;
		token_id: number;
		token_uri: string;
		creator: string;
		seller: string;
		owner_of: string;
		price: string;
		price_formatted?: number | null;
		sold: boolean;
		description: string;
		external_url?: string | null;
		animation_url?: string | null;
		youtube_url?: string | null;
		image: string;
		thumbnail?: string | null;
		likes?: number | null;
		is_liked?: boolean | null;
		is_favourited?: boolean | null;
		updated_at?: any | null;
		created_at?: any | null;
		attributes?: Array<{
			__typename?: "MarketItemAttributes";
			trait_type: string;
			value: string;
			display_type?: string | null;
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
		_id: number;
		name: string;
		token_address: string;
		token_id: number;
		token_uri: string;
		creator: string;
		seller: string;
		owner_of: string;
		price: string;
		price_formatted?: number | null;
		sold: boolean;
		description: string;
		external_url?: string | null;
		animation_url?: string | null;
		youtube_url?: string | null;
		image: string;
		thumbnail?: string | null;
		likes?: number | null;
		is_liked?: boolean | null;
		is_favourited?: boolean | null;
		updated_at?: any | null;
		created_at?: any | null;
		attributes?: Array<{
			__typename?: "MarketItemAttributes";
			trait_type: string;
			value: string;
			display_type?: string | null;
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
		created_at?: any | null;
		updated_at?: any | null;
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
		created_at?: any | null;
		updated_at?: any | null;
	}>;
};

export type WalletNftTransferQueryVariables = Exact<{
	chain: Scalars["String"];
	address: Scalars["String"];
}>;

export type WalletNftTransferQuery = {
	__typename?: "Query";
	walletNFTTransfers?: Array<{
		__typename?: "NFTTransfer";
		token_address: string;
		token_id: string;
		from_address: string;
		to_address: string;
		value?: string | null;
		amount?: string | null;
		contract_type?: string | null;
		block_number?: string | null;
		block_timestamp?: string | null;
		block_hash?: string | null;
		transaction_hash?: string | null;
		transaction_type?: string | null;
		transaction_index?: number | null;
		log_index?: number | null;
		operator?: string | null;
	} | null> | null;
};

export type WalletNfTsQueryVariables = Exact<{
	chain: Scalars["String"];
	address: Scalars["String"];
}>;

export type WalletNfTsQuery = {
	__typename?: "Query";
	walletNFTs?: Array<{
		__typename?: "NFT";
		token_address: string;
		token_id: string;
		contract_type?: string | null;
		owner_of?: string | null;
		block_number?: string | null;
		block_number_minted?: string | null;
		token_uri?: string | null;
		amount?: string | null;
		name?: string | null;
		symbol?: string | null;
		token_hash?: string | null;
		last_token_uri_sync?: string | null;
		last_metadata_sync?: string | null;
		description?: string | null;
		image?: string | null;
		thumbnail?: string | null;
		attributes?: any | null;
		external_url?: string | null;
		animation_url?: string | null;
		youtube_url?: string | null;
	} | null> | null;
};

export const AddToFavouritesDocument = gql`
	mutation AddToFavourites($token_id: Int) {
		addToFavourites(token_id: $token_id) {
			is_favourited
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
 *      token_id: // value for 'token_id'
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
	mutation Dislike($token_id: Int) {
		dislike(token_id: $token_id) {
			likes
			is_liked
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
 *      token_id: // value for 'token_id'
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
	mutation Like($token_id: Int) {
		like(token_id: $token_id) {
			likes
			is_liked
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
 *      token_id: // value for 'token_id'
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
	mutation RemoveFromFavourites($token_id: Int) {
		removeFromFavourites(token_id: $token_id) {
			is_favourited
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
 *      token_id: // value for 'token_id'
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
export const AccountNftDocument = gql`
	query AccountNFT($chain: String!, $address: String!, $token_address: String!, $token_id: Int!) {
		accountNFT(
			chain: $chain
			address: $address
			token_address: $token_address
			token_id: $token_id
		) {
			token_address
			token_id
			contract_type
			owner_of
			block_number
			block_number_minted
			token_uri
			name
			amount
			symbol
			token_hash
			last_token_uri_sync
			last_metadata_sync
			description
			image
			thumbnail
			attributes
			external_url
			animation_url
			youtube_url
		}
	}
`;

/**
 * __useAccountNftQuery__
 *
 * To run a query within a React component, call `useAccountNftQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountNftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountNftQuery({
 *   variables: {
 *      chain: // value for 'chain'
 *      address: // value for 'address'
 *      token_address: // value for 'token_address'
 *      token_id: // value for 'token_id'
 *   },
 * });
 */
export function useAccountNftQuery(
	baseOptions: Apollo.QueryHookOptions<AccountNftQuery, AccountNftQueryVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useQuery<AccountNftQuery, AccountNftQueryVariables>(AccountNftDocument, options);
}
export function useAccountNftLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<AccountNftQuery, AccountNftQueryVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useLazyQuery<AccountNftQuery, AccountNftQueryVariables>(
		AccountNftDocument,
		options,
	);
}
export type AccountNftQueryHookResult = ReturnType<typeof useAccountNftQuery>;
export type AccountNftLazyQueryHookResult = ReturnType<typeof useAccountNftLazyQuery>;
export type AccountNftQueryResult = Apollo.QueryResult<AccountNftQuery, AccountNftQueryVariables>;
export const MarketItemDocument = gql`
	query MarketItem($filter: FilterFindOneMarketItemInput) {
		marketItem(filter: $filter) {
			_id
			name
			token_address
			token_id
			token_uri
			creator
			seller
			owner_of
			price
			price_formatted
			sold
			description
			external_url
			animation_url
			youtube_url
			attributes {
				trait_type
				value
				display_type
			}
			image
			thumbnail
			likes
			is_liked
			is_favourited
			updated_at
			created_at
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
			_id
			name
			token_address
			token_id
			token_uri
			creator
			seller
			owner_of
			price
			price_formatted
			sold
			description
			external_url
			animation_url
			youtube_url
			attributes {
				trait_type
				value
				display_type
			}
			image
			thumbnail
			likes
			is_liked
			is_favourited
			updated_at
			created_at
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
			created_at
			updated_at
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
			created_at
			updated_at
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
export const WalletNftTransferDocument = gql`
	query WalletNFTTransfer($chain: String!, $address: String!) {
		walletNFTTransfers(chain: $chain, address: $address) {
			token_address
			token_id
			from_address
			to_address
			value
			amount
			contract_type
			block_number
			block_timestamp
			block_hash
			transaction_hash
			transaction_type
			transaction_index
			log_index
			operator
		}
	}
`;

/**
 * __useWalletNftTransferQuery__
 *
 * To run a query within a React component, call `useWalletNftTransferQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletNftTransferQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletNftTransferQuery({
 *   variables: {
 *      chain: // value for 'chain'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useWalletNftTransferQuery(
	baseOptions: Apollo.QueryHookOptions<WalletNftTransferQuery, WalletNftTransferQueryVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useQuery<WalletNftTransferQuery, WalletNftTransferQueryVariables>(
		WalletNftTransferDocument,
		options,
	);
}
export function useWalletNftTransferLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		WalletNftTransferQuery,
		WalletNftTransferQueryVariables
	>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useLazyQuery<WalletNftTransferQuery, WalletNftTransferQueryVariables>(
		WalletNftTransferDocument,
		options,
	);
}
export type WalletNftTransferQueryHookResult = ReturnType<typeof useWalletNftTransferQuery>;
export type WalletNftTransferLazyQueryHookResult = ReturnType<typeof useWalletNftTransferLazyQuery>;
export type WalletNftTransferQueryResult = Apollo.QueryResult<
	WalletNftTransferQuery,
	WalletNftTransferQueryVariables
>;
export const WalletNfTsDocument = gql`
	query WalletNFTs($chain: String!, $address: String!) {
		walletNFTs(chain: $chain, address: $address) {
			token_address
			token_id
			contract_type
			owner_of
			block_number
			block_number_minted
			token_uri
			amount
			name
			symbol
			token_hash
			last_token_uri_sync
			last_metadata_sync
			description
			image
			thumbnail
			attributes
			external_url
			animation_url
			youtube_url
		}
	}
`;

/**
 * __useWalletNfTsQuery__
 *
 * To run a query within a React component, call `useWalletNfTsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletNfTsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletNfTsQuery({
 *   variables: {
 *      chain: // value for 'chain'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useWalletNfTsQuery(
	baseOptions: Apollo.QueryHookOptions<WalletNfTsQuery, WalletNfTsQueryVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useQuery<WalletNfTsQuery, WalletNfTsQueryVariables>(WalletNfTsDocument, options);
}
export function useWalletNfTsLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<WalletNfTsQuery, WalletNfTsQueryVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useLazyQuery<WalletNfTsQuery, WalletNfTsQueryVariables>(
		WalletNfTsDocument,
		options,
	);
}
export type WalletNfTsQueryHookResult = ReturnType<typeof useWalletNfTsQuery>;
export type WalletNfTsLazyQueryHookResult = ReturnType<typeof useWalletNfTsLazyQuery>;
export type WalletNfTsQueryResult = Apollo.QueryResult<WalletNfTsQuery, WalletNfTsQueryVariables>;
