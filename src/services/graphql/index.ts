import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from "react-query";
import {GraphQLClient} from "graphql-request";
import {RequestInit} from "graphql-request/dist/types.dom";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>};

function fetcher<TData, TVariables>(
	client: GraphQLClient,
	query: string,
	variables?: TVariables,
	headers?: RequestInit["headers"],
) {
	return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export type Mutation = {
	__typename?: "Mutation";
	createUser: User;
	updateUser?: Maybe<User>;
};

export type MutationCreateUserArgs = {
	data: UserInput;
};

export type MutationUpdateUserArgs = {
	_id: Scalars["ID"];
	data: UserInput;
};

export type Query = {
	__typename?: "Query";
	allUsers: Array<User>;
	getUser?: Maybe<User>;
};

export type QueryGetUserArgs = {
	_id: Scalars["ID"];
};

export type User = {
	__typename?: "User";
	_id: Scalars["ID"];
	accounts: Array<Maybe<Scalars["String"]>>;
	username: Scalars["String"];
};

export type UserInput = {
	accounts: Array<InputMaybe<Scalars["String"]>>;
	username: Scalars["String"];
};

export type CreateUserMutationVariables = Exact<{
	data: UserInput;
}>;

export type CreateUserMutation = {
	__typename?: "Mutation";
	createUser: {
		__typename?: "User";
		_id: string;
		username: string;
		accounts: Array<string | null>;
	};
};

export type UpdateUserMutationVariables = Exact<{
	_id: Scalars["ID"];
	data: UserInput;
}>;

export type UpdateUserMutation = {
	__typename?: "Mutation";
	updateUser?: {
		__typename?: "User";
		_id: string;
		username: string;
		accounts: Array<string | null>;
	} | null;
};

export type GetAllUsersQueryVariables = Exact<{[key: string]: never}>;

export type GetAllUsersQuery = {
	__typename?: "Query";
	allUsers: Array<{
		__typename?: "User";
		_id: string;
		username: string;
		accounts: Array<string | null>;
	}>;
};

export type GetUserQueryVariables = Exact<{
	id: Scalars["ID"];
}>;

export type GetUserQuery = {
	__typename?: "Query";
	getUser?: {
		__typename?: "User";
		_id: string;
		username: string;
		accounts: Array<string | null>;
	} | null;
};

export const CreateUserDocument = `
    mutation CreateUser($data: UserInput!) {
  createUser(data: $data) {
    _id
    username
    accounts
  }
}
    `;
export const useCreateUserMutation = <TError = unknown, TContext = unknown>(
	client: GraphQLClient,
	options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>,
	headers?: RequestInit["headers"],
) =>
	useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
		["CreateUser"],
		(variables?: CreateUserMutationVariables) =>
			fetcher<CreateUserMutation, CreateUserMutationVariables>(
				client,
				CreateUserDocument,
				variables,
				headers,
			)(),
		options,
	);
export const UpdateUserDocument = `
    mutation UpdateUser($_id: ID!, $data: UserInput!) {
  updateUser(_id: $_id, data: $data) {
    _id
    username
    accounts
  }
}
    `;
export const useUpdateUserMutation = <TError = unknown, TContext = unknown>(
	client: GraphQLClient,
	options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>,
	headers?: RequestInit["headers"],
) =>
	useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
		["UpdateUser"],
		(variables?: UpdateUserMutationVariables) =>
			fetcher<UpdateUserMutation, UpdateUserMutationVariables>(
				client,
				UpdateUserDocument,
				variables,
				headers,
			)(),
		options,
	);
export const GetAllUsersDocument = `
    query GetAllUsers {
  allUsers {
    _id
    username
    accounts
  }
}
    `;
export const useGetAllUsersQuery = <TData = GetAllUsersQuery, TError = unknown>(
	client: GraphQLClient,
	variables?: GetAllUsersQueryVariables,
	options?: UseQueryOptions<GetAllUsersQuery, TError, TData>,
	headers?: RequestInit["headers"],
) =>
	useQuery<GetAllUsersQuery, TError, TData>(
		variables === undefined ? ["GetAllUsers"] : ["GetAllUsers", variables],
		fetcher<GetAllUsersQuery, GetAllUsersQueryVariables>(
			client,
			GetAllUsersDocument,
			variables,
			headers,
		),
		options,
	);
export const GetUserDocument = `
    query GetUser($id: ID!) {
  getUser(_id: $id) {
    _id
    username
    accounts
  }
}
    `;
export const useGetUserQuery = <TData = GetUserQuery, TError = unknown>(
	client: GraphQLClient,
	variables: GetUserQueryVariables,
	options?: UseQueryOptions<GetUserQuery, TError, TData>,
	headers?: RequestInit["headers"],
) =>
	useQuery<GetUserQuery, TError, TData>(
		["GetUser", variables],
		fetcher<GetUserQuery, GetUserQueryVariables>(client, GetUserDocument, variables, headers),
		options,
	);
