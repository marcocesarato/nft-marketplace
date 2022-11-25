import React from "react";
import {composeStories} from "@storybook/testing-react";
import {MemoryRouterProvider} from "next-router-mock/MemoryRouterProvider";

import * as stories from "./BottomBar.stories";

const {Basic} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

const withDecorators = (Story) => (
	<MemoryRouterProvider>
		<Story />
	</MemoryRouterProvider>
);

describe("<BottomBar />", () => {
	it("mounts", () => {
		cy.mount(withDecorators(Basic));
	});
});
