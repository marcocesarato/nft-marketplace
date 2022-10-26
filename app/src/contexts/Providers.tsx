import {ChakraProvider} from "@chakra-ui/react";

import theme from "@app/theme";
import {ApolloProvider} from "@contexts/Apollo";
import {GlobalProvider} from "@contexts/Global";
import Web3Provider from "@contexts/Web3Provider";
import GlobalStyles from "@layouts/GlobalStyles";

function Providers({children}): JSX.Element {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<GlobalStyles />
			<ApolloProvider>
				<GlobalProvider>
					<Web3Provider>{children}</Web3Provider>
				</GlobalProvider>
			</ApolloProvider>
		</ChakraProvider>
	);
}

export default Providers;
