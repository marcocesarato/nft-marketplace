import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Particles.stories";

const {Basic} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

describe("<Particles />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
