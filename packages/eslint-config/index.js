module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [/*"turbo",*/ "prettier", "plugin:prettier/recommended"],
	plugins: ["etc", "simple-import-sort", "prettier"],
	env: {
		node: true,
		browser: true,
		jest: true,
	},
	parserOptions: {
		sourceType: "module",
	},
	rules: {
		"prettier/prettier": "error",
		"no-var": "warn",
		"prefer-const": "warn",
	},
};
