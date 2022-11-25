import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Subtitle.stories";

const {Basic} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

describe("<Subtitle />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
