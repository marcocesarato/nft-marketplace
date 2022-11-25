import React from "react";

import BuilderPage from "@pages/builder";

describe("<BuilderPage />", () => {
	it("mounts", () => {
		cy.mountPage(<BuilderPage />);
	});
});
