import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Product3D.stories";

const {Basic, Owned, Purchasable} = composeStories(stories) as {[key: string]: React.ElementType};

describe("<Product3D />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
	it("mounts owned", () => {
		cy.mount(<Owned />);
	});
	it("mounts purchasable", () => {
		cy.mount(<Purchasable />);
	});
});
