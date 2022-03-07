import {MoralisProvider} from "react-moralis";
import {QueryClient, QueryClientProvider} from "react-query";
import {ChakraProvider} from "@chakra-ui/react";

import {moralisAppId, moralisServerUrl} from "@configs/moralis";
import {GlobalProvider} from "@contexts/Global";

import theme from "./theme";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

function Providers({children}) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<MoralisProvider appId={moralisAppId} serverUrl={moralisServerUrl}>
				<QueryClientProvider client={queryClient}>
					<GlobalProvider>{children}</GlobalProvider>
				</QueryClientProvider>
			</MoralisProvider>
		</ChakraProvider>
	);
}

export default Providers;
