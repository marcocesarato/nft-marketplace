import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./TexturePicker.stories";

const {Basic} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

describe("<TexturePicker />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
