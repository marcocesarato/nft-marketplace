import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./AssetPicker.stories";

const {Basic} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

describe("<AssetPicker />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
