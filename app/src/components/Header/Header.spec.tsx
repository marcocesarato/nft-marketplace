import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Header.stories";

const {Basic} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

describe("<Header />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
