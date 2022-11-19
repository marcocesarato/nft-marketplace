const path = require("path");
const {TsconfigPathsPlugin} = require("tsconfig-paths-webpack-plugin");
module.exports = {
	stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
        "@chakra-ui/storybook-addon",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	framework: "@storybook/react",
	features: {emotionAlias: false},
	core: {
		builder: "@storybook/builder-webpack5",
	},
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.mjs$/,
			include: /node_modules/,
			type: "javascript/auto",
		});
        config.resolve.plugins = config.resolve.plugins || [];
        config.resolve.plugins.push(
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, "../tsconfig.json"),
            })
        );
		return config;
	},
};
