import React from "react";

import TransfersPage from "@pages/transfers";

describe("<TransfersPage />", () => {
	it("mounts", () => {
		cy.mountPage(<TransfersPage />);
	});
});
