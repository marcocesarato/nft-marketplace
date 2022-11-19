import {Suspense} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {RouterContext} from "next/dist/shared/lib/router-context";
import {I18nextProvider} from "react-i18next";
import {withI18next} from "storybook-addon-i18next";
import {MockedProvider} from "@apollo/client/testing";
import i18n from "./i18n";

import theme from "../src/theme";
import Container from "../src/components/Container";
import {ApolloProvider} from "../src/contexts/Apollo";
import {GlobalProvider} from "../src/contexts/Global";
import Web3Provider from "../src/contexts/Web3Provider";
import GlobalStyles from "../src/layouts/GlobalStyles";

export const parameters = {
	actions: {argTypesRegex: "^on[A-Z].*"},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	chakra: {
		theme: theme,
	},
	nextRouter: {
		Provider: RouterContext.Provider,
	},
	apolloClient: {
		MockedProvider,
	},
	core: {
		builder: "webpack5",
	},
	locale: "en",
	locales: {
		en: "English",
		it: "Italiano",
	},
	features: {
		storyStoreV7: true,
		interactionsDebugger: true,
	},
};

export const decorators = [
	withI18next({i18n, languages: {en: "English", it: "Italiano"}}),
	(Story) => (
		<Suspense fallback="loading...">
			<ChakraProvider resetCSS theme={theme}>
				<GlobalStyles />
				<ApolloProvider>
					<GlobalProvider>
						<Web3Provider>
							<I18nextProvider i18n={i18n}>
								<Container
									position="absolute"
									p={4}
									left={4}
									right={4}
									borderRadius={5}>
									<Story />
								</Container>
							</I18nextProvider>
						</Web3Provider>
					</GlobalProvider>
				</ApolloProvider>
			</ChakraProvider>
		</Suspense>
	),
];
