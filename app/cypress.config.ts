import {defineConfig} from "cypress";

export default defineConfig({
	projectId: "3ogoph",
	e2e: {
		baseUrl: "http://localhost:3000",
		video: false,
		setupNodeEvents(on, config) {
			require("@cypress/code-coverage/task")(on, config);
			return config;
		},
	},
	component: {
		video: false,
		specPattern: [
			"cypress/component/**/*.{cy,spec}.{js,jsx,ts,tsx}",
			"src/**/*.{cy,spec}.{js,jsx,ts,tsx}",
		],
		devServer: {
			framework: "next",
			bundler: "webpack",
		},
		setupNodeEvents(on, config) {
			require("@cypress/code-coverage/task")(on, config);
			return config;
		},
	},
});
