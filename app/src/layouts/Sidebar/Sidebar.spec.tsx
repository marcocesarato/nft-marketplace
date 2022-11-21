import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Sidebar.stories";

const {Basic} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

describe("<Catalog />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
