import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Avatar.stories";

const {Basic, Image} = composeStories(stories) as {[key: string]: React.ElementType};

describe("<Avatar />", () => {
	it("mounts", () => {
		const size = 64; // Check on storybook file
		cy.mount(<Basic />)
			.get("svg")
			.parent()
			.should("have.css", "width", `${size}px`)
			.should("have.css", "height", `${size}px`);
	});

	it("mounts with ensImage", () => {
		const size = 64;
		cy.mount(<Image />)
			.get("img")
			.parent()
			.should("have.css", "width", `${size}px`)
			.should("have.css", "height", `${size}px`);
	});
});
