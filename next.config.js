require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");
const {i18n} = require("./next-i18next.config");

module.exports = {
	reactStrictMode: true,
	experimental: {
		outputStandalone: true,
	},
	poweredByHeader: false,
	i18n,
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			// your aliases
		};
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
};
