const {i18n} = require("./next-i18next.config");
const runtimeCaching = require("next-pwa/cache");
const {patchWebpackConfig} = require("next-global-css");

// Load environment
require("dotenv-mono").load();

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
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		externalDir: true,
	},
	compiler: {
		emotion: true,
	},
	i18n,
	webpack: (config, {webpack, dev, isServer, ...options}) => {
		// graphql
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: "graphql-tag/loader",
		});
		config.plugins = config.plugins || [];
		// Cypress
		if (process.env.CYPRESS === "true") {
			//Allows importing the global.css file in cypress/support/component.ts
			patchWebpackConfig(config, {webpack, dev, isServer, ...options});
		}
		return config;
	},
});

module.exports = nextConfig;
