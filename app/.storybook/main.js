const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv-mono").load();
const {TsconfigPathsPlugin} = require("tsconfig-paths-webpack-plugin");

// Get styles for preview
const rainbowCss = fs.readFileSync("../node_modules/@rainbow-me/rainbowkit/dist/index.css", {
	encoding: "utf8",
	flag: "r",
});

const config = {
	stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
	staticDirs: ["../public"],
	addons: [
		"@chakra-ui/storybook-addon",
		"storybook-addon-next",
		"storybook-addon-i18next/register",
		"@storybook/addon-a11y",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	framework: "@storybook/react",
	features: {emotionAlias: false, interactionsDebugger: true},
	core: {
		builder: "@storybook/builder-webpack5",
		options: {
			lazyCompilation: true,
		},
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
			test: /\.mjs$/i,
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
		config.resolve.alias = config.resolve.alias || {};
		config.resolve.alias = {
			...config.resolve.alias,
			"next-i18next": "react-i18next",
			"next/dist/next-server/lib/router-context": "next-router-mock",
		};

		return config;
	},
	previewHead: (head) => `
        ${head}
        <style>
            body::before {
              display: none;
            }
            ${rainbowCss}
        </style>
    `,
};
module.exports = config;
