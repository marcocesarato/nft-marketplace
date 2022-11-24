import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./GalleryBuilder.stories";

const {Basic} = composeStories(stories) as {[key: string]: React.ElementType};

describe("<GalleryBuilder />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
});
