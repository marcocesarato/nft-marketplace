import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import {RetryLink} from "@apollo/client/link/retry";

import useAccount from "@hooks/useAccount";

function Provider({children}): JSX.Element {
	const {signature, account} = useAccount();
	const directionalLink = new RetryLink().split(
		(operation) => operation.getContext().context === "subgraph",
		new HttpLink({uri: process.env.SUBGRAPH_URL}),
		new HttpLink({uri: `${process.env.PUBLIC_URL}/api/graphql`}),
	);

	// Usage: pass client name in query/mutation
	// useQuery(QUERY, {variables, context: {context: 'subgraph'}})
	const apolloClient = new ApolloClient({
		link: directionalLink,
		cache: new InMemoryCache(),
		headers: {
			"X-ETH-Signature": signature,
			"X-ETH-Account": account,
		},
	});
	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

export default Provider;
