const {i18n} = require("./next-i18next.config");
const {dotenvLoad} = require("@packages/dotenv");
const runtimeCaching = require("next-pwa/cache");

// Load env
dotenvLoad();

const isDev = process.env.NODE_ENV === "development";
const withPWA = require("next-pwa")({
	runtimeCaching,
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: isDev,
	buildExcludes: [
		/middleware-manifest\.json$/,
		/middleware.*manifest\.js$/,
		/_middleware\.js$/,
		/_middleware\.js\.map$/,
		/middleware-runtime\.js$/,
		/middleware-runtime\.js\.map$/,
	],
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
	compiler: {
		emotion: true,
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
