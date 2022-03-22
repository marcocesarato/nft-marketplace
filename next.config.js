require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");
const {i18n} = require("./next-i18next.config");
const withPWA = require("next-pwa");

module.exports = withPWA({
	reactStrictMode: true,
	experimental: {
		outputStandalone: true,
	},
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
	},
	poweredByHeader: false,
	i18n,
	webpack: (config, {webpack, dev, isServer}) => {
		// graphql
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: "graphql-tag/loader",
		});
		config.plugins = config.plugins || [];
		config.plugins = [
			...config.plugins,
			new Dotenv({
				path: path.join(__dirname, ".env"),
				systemvars: true,
			}),
		];
		return config;
	},
});
