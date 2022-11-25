import React from "react";

import SellPage from "@pages/sell";

describe("<SellPage />", () => {
	it("mounts", () => {
		cy.mountPage(<SellPage />);
	});
});
