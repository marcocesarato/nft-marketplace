import {MoralisProvider} from "react-moralis";
import {QueryClientProvider} from "react-query";
import {ChakraProvider} from "@chakra-ui/react";

import {moralisAppId, moralisServerUrl} from "@configs/moralis";
import queryClient from "@configs/query";
import {ApolloProvider} from "@contexts/Apollo";
import {GlobalProvider} from "@contexts/Global";

import theme from "./theme";

function Providers({children}): JSX.Element {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<MoralisProvider appId={moralisAppId} serverUrl={moralisServerUrl}>
				<ApolloProvider>
					<QueryClientProvider client={queryClient}>
						<GlobalProvider>{children}</GlobalProvider>
					</QueryClientProvider>
				</ApolloProvider>
			</MoralisProvider>
		</ChakraProvider>
	);
}

export default Providers;
