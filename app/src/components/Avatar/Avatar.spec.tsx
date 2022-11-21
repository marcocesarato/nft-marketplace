import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Avatar.stories";

const {Basic, Image} = composeStories(stories) as {[key: string]: React.ElementType};

const size = 64; // Check on stories file

describe("<Avatar />", () => {
	it("mounts", () => {
		cy.mount(<Basic />)
			.get("[data-testid=image-container]")
			.should("have.css", "width", `${size}px`)
			.should("have.css", "height", `${size}px`);
	});

	it("mounts with ensImage", () => {
		cy.mount(<Image />)
			.get("[data-testid=image-container]")
			.should("have.css", "width", `${size}px`)
			.should("have.css", "height", `${size}px`);
	});
});
