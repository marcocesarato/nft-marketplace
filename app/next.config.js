const {i18n} = require("./next-i18next.config");
const {dotenvLoad} = require("@packages/dotenv");

// Load env
dotenvLoad();

const isDev = process.env.NODE_ENV === "development";
const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: isDev,
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withPWA({
	reactStrictMode: true,
	output: "standalone",
	poweredByHeader: false,
	experimental: {
		externalDir: true,
	},
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

module.exports = nextConfig;
