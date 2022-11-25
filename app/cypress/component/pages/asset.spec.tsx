import React from "react";

import AssetPage from "@pages/asset/[id]";

describe("<AssetPage />", () => {
	it("mounts", () => {
		cy.mountPage(<AssetPage />);
	});
});
