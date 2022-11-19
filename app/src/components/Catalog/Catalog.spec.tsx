import React from "react";
import {composeStories} from "@storybook/testing-react";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";

import * as stories from "./Catalog.stories";

const {Basic, Owned, NotSortable, Purchasable} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

const withDecorators = (Story) => (
	<MemoryRouterProvider>
		<Story />
	</MemoryRouterProvider>
);

describe("<Catalog />", () => {
	it("mounts", () => {
		cy.mount(withDecorators(Basic));
	});

	it("mounts owned", () => {
		cy.mount(withDecorators(Owned));
	});

	it("mounts purchasable", () => {
		cy.mount(withDecorators(Purchasable));
	});

	it("mounts not sortable", () => {
		cy.mount(withDecorators(NotSortable));
	});
});
