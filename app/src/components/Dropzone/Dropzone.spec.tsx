import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Dropzone.stories";

const {Basic, WithImageType, WithAnimationType} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

describe("<Dropzone />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});

	it("mounts with image type", () => {
		cy.mount(<WithImageType />);
	});

	it("mounts with animation type", () => {
		cy.mount(<WithAnimationType />);
	});
});
