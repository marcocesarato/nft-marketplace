import {QueryClientProvider} from "react-query";
import {ChakraProvider} from "@chakra-ui/react";

import queryClient from "@configs/query";
import {ApolloProvider} from "@contexts/Apollo";
import {GlobalProvider} from "@contexts/Global";
import GlobalStyles from "@layouts/GlobalStyles";

import Web3Provider from "./contexts/Web3Provider";
import theme from "./theme";

function Providers({children}): JSX.Element {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<GlobalStyles />
			<ApolloProvider>
				<QueryClientProvider client={queryClient}>
					<GlobalProvider>
						<Web3Provider>{children}</Web3Provider>
					</GlobalProvider>
				</QueryClientProvider>
			</ApolloProvider>
		</ChakraProvider>
	);
}

export default Providers;
