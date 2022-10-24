module.exports = {
	root: true,
	extends: ["@packages/eslint-config", "plugin:chai-friendly/recommended"],
	plugins: ["cypress", "chai-friendly"],
	env: {
		"cypress/globals": true,
	},
};
