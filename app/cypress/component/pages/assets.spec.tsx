import React from "react";

import AssetsPage from "@pages/assets";

describe("<AssetsPage />", () => {
	it("mounts", () => {
		cy.mountPage(<AssetsPage />);
	});
});
