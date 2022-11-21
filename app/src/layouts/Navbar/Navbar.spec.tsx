import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Navbar.stories";

const {Basic} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

describe("<Navbar />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
