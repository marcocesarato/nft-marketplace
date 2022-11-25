module.exports = (plop) => {
	plop.setGenerator("component", {
		description: "App Component",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Component name:",
			},
		],
		actions: [
			{
				type: "add",
				path: "src/components/{{pascalCase name}}/index.tsx",
				templateFile: "templates/component/component.hbs",
			},
			{
				type: "add",
				path: "src/components/{{pascalCase name}}/{{pascalCase name}}.spec.tsx",
				templateFile: "templates/component/component.spec.hbs",
			},
			{
				type: "add",
				path: "src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
				templateFile: "templates/component/component.stories.hbs",
			},
		],
	});
	plop.setGenerator("hook", {
		description: "App Hook",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Hook name:",
			},
		],
		actions: [
			{
				type: "add",
				path: "src/hooks/use{{pascalCase name}}.ts",
				templateFile: "templates/hook/hook.hbs",
			},
		],
	});
	plop.setGenerator("page", {
		description: "App Page",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "Page name:",
			},
		],
		actions: [
			{
				type: "add",
				path: "src/pages/{{lowerCase name}}.tsx",
				templateFile: "templates/page/page.hbs",
			},
			{
				type: "add",
				path: "cypress/component/pages/{{lowerCase name}}.spec.tsx",
				templateFile: "templates/page/page.spec.hbs",
			},
		],
	});
};
