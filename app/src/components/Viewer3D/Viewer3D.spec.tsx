import React from "react";
import {composeStories} from "@storybook/testing-react";

import * as stories from "./Viewer3D.stories";

const {Basic, Model} = composeStories(stories) as {[key: string]: React.ElementType};

describe("<Viewer3D />", () => {
	it("mounts", () => {
		cy.mount(<Basic />);
	});
	it("mounts model", () => {
		cy.mount(<Model />);
	});
});
