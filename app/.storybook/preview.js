import {MockedProvider} from "@apollo/client/testing";

import theme from "../src/theme";
import {GlobalDecorators} from "./decorators";

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

export const decorators = GlobalDecorators;
