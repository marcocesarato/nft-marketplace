import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./ProductCard.stories";

const {Basic, Owned, Purchasable} = composeStories(stories) as {[key: string]: React.ElementType};

describe("<ProductCard />", () => {
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
