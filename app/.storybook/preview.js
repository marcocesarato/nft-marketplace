import {ChakraProvider} from "@chakra-ui/react";
import {I18nextProvider} from "react-i18next";
import {withI18next} from "storybook-addon-i18next";

import i18n from "./i18n";

import theme from "../src/theme";
import {ApolloProvider} from "../src/contexts/Apollo";
import {GlobalProvider} from "../src/contexts/Global";
import GlobalStyles from "../src/layouts/GlobalStyles";
import {Suspense} from "react";

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
	locale: "en",
	locales: {
		en: "English",
		it: "Italiano",
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
						<I18nextProvider i18n={i18n}>
							<Story />
						</I18nextProvider>
					</GlobalProvider>
				</ApolloProvider>
			</ChakraProvider>
		</Suspense>
	),
];
