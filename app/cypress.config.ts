import {defineConfig} from "cypress";

export default defineConfig({
	projectId: "3ogoph",
	e2e: {
		baseUrl: "http://localhost:3000",
		setupNodeEvents(on, config) {
			// implement node event listeners here
			return config;
		},
	},
	component: {
		specPattern: [
			"cypress/component/**/*.{cy,spec}.{js,jsx,ts,tsx}",
			"src/**/*.{cy,spec}.{js,jsx,ts,tsx}",
		],
		devServer: {
			framework: "next",
			bundler: "webpack",
		},
	},
});
