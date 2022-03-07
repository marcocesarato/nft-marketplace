import {MoralisProvider} from "react-moralis";
import {QueryClientProvider} from "react-query";
import {ChakraProvider} from "@chakra-ui/react";

import {moralisAppId, moralisServerUrl} from "@configs/moralis";
import queryClient from "@configs/query";
import {GlobalProvider} from "@contexts/Global";

import theme from "./theme";

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
