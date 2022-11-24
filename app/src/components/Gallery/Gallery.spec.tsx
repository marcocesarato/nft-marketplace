import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Gallery.stories";

const {Basic} = composeStories(stories) as {[key: string]: React.ElementType};

describe("<Gallery />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
