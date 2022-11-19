import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Address.stories";

const {Basic, WithName, WithLabel} = composeStories(stories) as {[key: string]: React.ElementType};
describe("<Address />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
	it("mounts with name", () => {
		cy.mount(<WithName />);
	});
	it("mounts with label", () => {
		cy.mount(<WithLabel />);
	});
});
