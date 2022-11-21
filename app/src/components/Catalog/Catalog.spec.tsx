import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Catalog.stories";

const {Basic, Owned, NotSortable, Purchasable} = composeStories(stories) as {
	[key: string]: React.ElementType;
};

describe("<Catalog />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});

	it("mounts owned", () => {
		cy.mount(<Owned />);
	});

	it("mounts purchasable", () => {
		cy.mount(<Purchasable />);
	});

	it("mounts not sortable", () => {
		cy.mount(<NotSortable />);
	});
});
