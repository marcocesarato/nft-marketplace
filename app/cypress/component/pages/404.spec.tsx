import React from "react";

import PageNotFound from "@pages/404";

describe("<PageNotFound />", () => {
	it("mounts", () => {
		cy.mountPage(<PageNotFound />);
	});
});
