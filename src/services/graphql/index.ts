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

export type CreateOneUserInput = {
	accounts: Array<InputMaybe<Scalars["String"]>>;
	username: Scalars["String"];
};

export type CreateOneUserPayload = {
	__typename?: "CreateOneUserPayload";
	/**
	 * Error that may occur during operation. If you request this field in GraphQL
	 * query, you will receive typed error in payload; otherwise error will be
	 * provided in root `errors` field of GraphQL response.
	 */
	error?: Maybe<ErrorInterface>;
	/** Created document */
	record?: Maybe<User>;
	/** Document ID */
	recordId?: Maybe<Scalars["MongoID"]>;
};

export type ErrorInterface = {
	/** Generic error message */
	message?: Maybe<Scalars["String"]>;
};

export type FilterCountUserInput = {
	AND?: InputMaybe<Array<FilterCountUserInput>>;
	OR?: InputMaybe<Array<FilterCountUserInput>>;
	_id?: InputMaybe<Scalars["MongoID"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterCountUserOperatorsInput>;
	accounts?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	username?: InputMaybe<Scalars["String"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountUserOperatorsInput = {
	_id?: InputMaybe<FilterCountUser_IdOperatorsInput>;
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

export type FilterFindManyUserInput = {
	AND?: InputMaybe<Array<FilterFindManyUserInput>>;
	OR?: InputMaybe<Array<FilterFindManyUserInput>>;
	_id?: InputMaybe<Scalars["MongoID"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterFindManyUserOperatorsInput>;
	accounts?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	username?: InputMaybe<Scalars["String"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyUserOperatorsInput = {
	_id?: InputMaybe<FilterFindManyUser_IdOperatorsInput>;
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

export type FilterFindOneUserInput = {
	AND?: InputMaybe<Array<FilterFindOneUserInput>>;
	OR?: InputMaybe<Array<FilterFindOneUserInput>>;
	_id?: InputMaybe<Scalars["MongoID"]>;
	/** List of *indexed* fields that can be filtered via operators. */
	_operators?: InputMaybe<FilterFindOneUserOperatorsInput>;
	accounts?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
	username?: InputMaybe<Scalars["String"]>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneUserOperatorsInput = {
	_id?: InputMaybe<FilterFindOneUser_IdOperatorsInput>;
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

export type MongoError = ErrorInterface & {
	__typename?: "MongoError";
	/** MongoDB error code */
	code?: Maybe<Scalars["Int"]>;
	/** MongoDB error message */
	message?: Maybe<Scalars["String"]>;
};

export type Mutation = {
	__typename?: "Mutation";
	/** Create one document with mongoose defaults, setters, hooks and validation */
	userCreate?: Maybe<CreateOneUserPayload>;
	/**
	 * Update one document: 1) Retrieve one document by findById. 2) Apply updates to
	 * mongoose document. 3) Mongoose applies defaults, setters, hooks and
	 * validation. 4) And save it.
	 */
	userUpdate?: Maybe<UpdateByIdUserPayload>;
};

export type MutationUserCreateArgs = {
	record: CreateOneUserInput;
};

export type MutationUserUpdateArgs = {
	_id: Scalars["MongoID"];
	record: UpdateByIdUserInput;
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
	user?: Maybe<User>;
	users: Array<User>;
	usersCount?: Maybe<Scalars["Int"]>;
	usersPagination?: Maybe<UserPagination>;
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

export enum SortFindManyUserInput {
	IdAsc = "_ID_ASC",
	IdDesc = "_ID_DESC",
}

export enum SortFindOneUserInput {
	IdAsc = "_ID_ASC",
	IdDesc = "_ID_DESC",
}

export type UpdateByIdUserInput = {
	accounts?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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

export type User = {
	__typename?: "User";
	_id: Scalars["MongoID"];
	accounts: Array<Maybe<Scalars["String"]>>;
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

export type UserCreateMutationVariables = Exact<{
	record: CreateOneUserInput;
}>;

export type UserCreateMutation = {
	__typename?: "Mutation";
	userCreate?: {
		__typename?: "CreateOneUserPayload";
		record?: {__typename?: "User"; username: string; accounts: Array<string | null>} | null;
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

export type UserUpdateMutationVariables = Exact<{
	id: Scalars["MongoID"];
	record: UpdateByIdUserInput;
}>;

export type UserUpdateMutation = {
	__typename?: "Mutation";
	userUpdate?: {
		__typename?: "UpdateByIdUserPayload";
		record?: {__typename?: "User"; username: string; accounts: Array<string | null>} | null;
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

export type UserQueryVariables = Exact<{
	filter?: InputMaybe<FilterFindOneUserInput>;
}>;

export type UserQuery = {
	__typename?: "Query";
	user?: {__typename?: "User"; username: string; accounts: Array<string | null>; _id: any} | null;
};

export type UsersQueryVariables = Exact<{
	filter?: InputMaybe<FilterFindManyUserInput>;
	skip?: InputMaybe<Scalars["Int"]>;
	limit?: InputMaybe<Scalars["Int"]>;
	sort?: InputMaybe<SortFindManyUserInput>;
}>;

export type UsersQuery = {
	__typename?: "Query";
	users: Array<{__typename?: "User"; username: string; accounts: Array<string | null>; _id: any}>;
};

export const UserCreateDocument = gql`
	mutation UserCreate($record: CreateOneUserInput!) {
		userCreate(record: $record) {
			record {
				username
				accounts
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
export type UserCreateMutationFn = Apollo.MutationFunction<
	UserCreateMutation,
	UserCreateMutationVariables
>;

/**
 * __useUserCreateMutation__
 *
 * To run a mutation, you first call `useUserCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userCreateMutation, { data, loading, error }] = useUserCreateMutation({
 *   variables: {
 *      record: // value for 'record'
 *   },
 * });
 */
export function useUserCreateMutation(
	baseOptions?: Apollo.MutationHookOptions<UserCreateMutation, UserCreateMutationVariables>,
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useMutation<UserCreateMutation, UserCreateMutationVariables>(
		UserCreateDocument,
		options,
	);
}
export type UserCreateMutationHookResult = ReturnType<typeof useUserCreateMutation>;
export type UserCreateMutationResult = Apollo.MutationResult<UserCreateMutation>;
export type UserCreateMutationOptions = Apollo.BaseMutationOptions<
	UserCreateMutation,
	UserCreateMutationVariables
>;
export const UserUpdateDocument = gql`
	mutation UserUpdate($id: MongoID!, $record: UpdateByIdUserInput!) {
		userUpdate(_id: $id, record: $record) {
			record {
				username
				accounts
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
export const UserDocument = gql`
	query User($filter: FilterFindOneUserInput) {
		user(filter: $filter) {
			username
			accounts
			_id
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
			username
			accounts
			_id
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
