const isDev = process.env.NODE_ENV === "development";
module.exports = {
	i18n: {
		defaultLocale: "en",
		locales: ["en", "it"],
	},
	reloadOnPrerender: isDev,
};
