import React from "react";

import HomePage from "@pages/index";

describe("<HomePage />", () => {
	it("mounts", () => {
		cy.mountPage(<HomePage />);
	});
});
