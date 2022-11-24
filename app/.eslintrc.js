module.exports = {
	root: true,
	extends: ["@packages/eslint-config", "react-app", "next", "plugin:@next/next/recommended"],
	rules: {
		"jsx-a11y/anchor-is-valid": "warn",
		"jsx-a11y/alt-text": "off",
	},
	overrides: [
		{
			files: ["*.{js,jsx,ts,tsx}"],
			rules: {
				"simple-import-sort/exports": "warn",
				"import/first": "warn",
				"import/newline-after-import": "warn",
				"import/no-duplicates": "warn",
				"simple-import-sort/imports": [
					"warn",
					{
						groups: [
							// Packages `react` related packages come first.
							["^react", "^next/", "^@?\\w"],
							// Internal packages.
							[
								"^@(app|abis|configs|contexts|layouts|components|errors|hooks|utils|database|models|services|assets|)(/.*|$)",
							],
							// Side effect imports.
							["^\\u0000"],
							// Parent imports. Put `..` last.
							[
								"^\\.\\.(?!/?$)",
								"^\\.\\./?$",
								"^\\./(?=.*/)(?!/?$)",
								"^\\.(?!/?$)",
								"^\\./?$",
							],
							// Style or data imports.
							["^.+\\.?(css|json)$"],
						],
					},
				],
			},
		},
		{
			files: [
				"*.stories.{js,jsx,ts,tsx}",
				"src/locales/**/*",
				"./src/theme/components/**/*.{js,jsx,ts,tsx}",
			],
			rules: {
				"import/no-anonymous-default-export": "off",
			},
		},
		{
			files: ["*.{cy,spec,test}.{js,jsx,ts,tsx}"],
			extends: ["plugin:cypress/recommended", "plugin:chai-friendly/recommended"],
			rules: {
				"@typescript-eslint/no-unused-expressions": "off",
			},
		},
	],
	env: {
		"cypress/globals": true,
	},
};
