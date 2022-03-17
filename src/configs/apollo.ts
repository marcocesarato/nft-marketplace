import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {RetryLink} from "@apollo/client/link/retry";

const directionalLink = new RetryLink().split(
	(operation) => operation.getContext().version === 1,
	new HttpLink({uri: process.env.SUBGRAPH_URL}),
	new HttpLink({uri: `${process.env.PUBLIC_URL}/api/graphql`}),
);

// Usage: pass client name in query/mutation
// useQuery(QUERY, {variables, context: {context: 'endpoint2'}})
const apolloClient = new ApolloClient({
	link: directionalLink,
	cache: new InMemoryCache(),
});

export default apolloClient;
