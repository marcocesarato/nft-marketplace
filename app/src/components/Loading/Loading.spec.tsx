import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Loading.stories";

const {Basic} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

describe("<Loading />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
