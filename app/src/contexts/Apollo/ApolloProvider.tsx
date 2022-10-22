import {useMemo} from "react";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import {Base64} from "js-base64";

import useAccount from "@hooks/useAccount";

function Provider({children}): JSX.Element {
	const {signature, signatureData, account} = useAccount();
	const apolloClient = useMemo(() => {
		const httpLink = new HttpLink({
			uri: `${process.env.NEXT_PUBLIC_URL}/api/graphql`,
			headers: {
				"X-ETH-Data": Base64.encode(signatureData || ""),
				"X-ETH-Signature": Base64.encode(signature || ""),
				"X-ETH-Account": Base64.encode(account || ""),
			},
		});
		return new ApolloClient({
			link: httpLink,
			ssrMode: typeof window === "undefined",
			cache: new InMemoryCache(),
			defaultOptions: {
				watchQuery: {
					fetchPolicy: "cache-and-network",
					errorPolicy: "ignore",
				},
				query: {
					fetchPolicy: "network-only",
					errorPolicy: "all",
				},
				mutate: {
					errorPolicy: "all",
				},
			},
		});
	}, [signatureData, signature, account]);

	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

export default Provider;
