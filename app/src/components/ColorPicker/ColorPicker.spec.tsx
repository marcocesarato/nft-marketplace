import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./ColorPicker.stories";

const {Basic} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

describe("<ColorPicker />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
