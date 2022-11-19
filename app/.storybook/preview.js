import {Suspense} from "react";
import {I18nextProvider} from "react-i18next";
import {withI18next} from "storybook-addon-i18next";
import {MockedProvider} from "@apollo/client/testing";
import i18n from "./i18n";

import theme from "../src/theme";
import Container from "../src/components/Container";
import Providers from "../src/contexts/Providers";
import {SessionProvider} from "next-auth/react";

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
			<Providers>
				<I18nextProvider i18n={i18n}>
					<SessionProvider>
						<Container position="absolute" p={4} left={4} right={4} borderRadius={5}>
							<Story />
						</Container>
					</SessionProvider>
				</I18nextProvider>
			</Providers>
		</Suspense>
	),
];
