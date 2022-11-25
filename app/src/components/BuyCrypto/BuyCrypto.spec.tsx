import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./BuyCrypto.stories";

const {Basic} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

describe("<BuyCrypto />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
