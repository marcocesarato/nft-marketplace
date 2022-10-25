import {useMemo} from "react";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";

function Provider({children}): JSX.Element {
	const apolloClient = useMemo(() => {
		const httpLink = new HttpLink({
			uri: `${process.env.NEXT_PUBLIC_URL}/api/graphql`,
			credentials: "same-origin",
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
	}, []);

	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

export default Provider;
