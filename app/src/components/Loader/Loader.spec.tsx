import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Loader.stories";

const {Basic} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

describe("<Loader />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
