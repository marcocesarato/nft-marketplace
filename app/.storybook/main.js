const path = require("path");
const dotenv = require("dotenv-mono").load();
const {TsconfigPathsPlugin} = require("tsconfig-paths-webpack-plugin");
const config = {
	stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
	staticDirs: ["../public"],
	addons: [
		"@chakra-ui/storybook-addon",
		"storybook-addon-next-router",
		"storybook-addon-i18next/register",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	framework: "@storybook/react",
	features: {emotionAlias: false},
	core: {
		builder: "@storybook/builder-webpack5",
	},
	env: (config) => {
		return {
			...config,
			...dotenv.env,
			STORYBOOK: true,
		};
	},
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.mjs$/,
			include: /node_modules/,
			type: "javascript/auto",
		});
		config.resolve.fallback = config.resolve.fallback = {
			fs: false,
			tls: false,
			net: false,
			module: false,
			assert: false,
			path: require.resolve("path-browserify"),
		};
		config.resolve.plugins = config.resolve.plugins || [];
		config.resolve.plugins.push(
			new TsconfigPathsPlugin({
				configFile: path.resolve(__dirname, "../tsconfig.json"),
			}),
		);
		return config;
	},
};
module.exports = config;
