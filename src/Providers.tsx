import {MoralisProvider} from "react-moralis";
import {QueryClientProvider} from "react-query";
import {ApolloProvider} from "@apollo/client";
import {ChakraProvider} from "@chakra-ui/react";

import apolloClient from "@configs/apollo";
import {moralisAppId, moralisServerUrl} from "@configs/moralis";
import queryClient from "@configs/query";
import {GlobalProvider} from "@contexts/Global";

import theme from "./theme";

function Providers({children}): JSX.Element {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<MoralisProvider appId={moralisAppId} serverUrl={moralisServerUrl}>
				<ApolloProvider client={apolloClient}>
					<QueryClientProvider client={queryClient}>
						<GlobalProvider>{children}</GlobalProvider>
					</QueryClientProvider>
				</ApolloProvider>
			</MoralisProvider>
		</ChakraProvider>
	);
}

export default Providers;
