import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./ViewerAR.stories";

const {Basic} = composeStories(stories) as {[key: string]: React.ElementType};

describe("<ViewerAR />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
