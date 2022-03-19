import {useMemo} from "react";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import {RetryLink} from "@apollo/client/link/retry";
import {Base64} from "js-base64";

import useAccount from "@hooks/useAccount";

function Provider({children}): JSX.Element {
	const {signature, signatureData, account} = useAccount();
	const apolloClient = useMemo(() => {
		const directionalLink = new RetryLink().split(
			(operation) => operation.getContext().target === "subgraph",
			new HttpLink({uri: process.env.SUBGRAPH_URL}),
			new HttpLink({
				uri: `${process.env.PUBLIC_URL}/api/graphql`,
				headers: {
					"X-ETH-Data": Base64.encode(signatureData || ""),
					"X-ETH-Signature": Base64.encode(signature || ""),
					"X-ETH-Account": Base64.encode(account || ""),
				},
			}),
		);
		return new ApolloClient({
			ssrMode: typeof window === "undefined",
			link: directionalLink,
			cache: new InMemoryCache(),
		});
	}, [signatureData, signature, account]);

	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

export default Provider;
