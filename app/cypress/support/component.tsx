// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// Storybook
import {setGlobalConfig} from "@storybook/testing-react";
// Alternatively you can use CommonJS syntax:
// require('./commands')
import {mount} from "cypress/react18";
// Router mock
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";

import "./commands";
import "../global.d";

import {withMainDecorator} from "../../.storybook/decorators";
import * as sbPreview from "../../.storybook/preview";

setGlobalConfig(sbPreview);

const withRouterProvider = (component) => <MemoryRouterProvider>{component}</MemoryRouterProvider>;

Cypress.Commands.add("mount", (component, options = {}) => {
	const wrapped = withRouterProvider(component);
	return mount(wrapped, options);
});

Cypress.Commands.add("mountPage", (component, options = {}) => {
	const wrappedRouter = withRouterProvider(component);
	const wrapped = withMainDecorator(() => wrappedRouter);
	return mount(wrapped, options);
});

// Example use:
// cy.mount(<MyComponent />)
