const {i18n} = require("./next-i18next.config");
const withPWA = require("next-pwa");

const isDev = process.env.NODE_ENV === "development";

module.exports = withPWA({
	reactStrictMode: true,
	outputStandalone: true,
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
		disable: isDev,
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
		return config;
	},
});
