import React from "react";

import CreatorDashboardPage from "@pages/creator-dashboard";

describe("<CreatorDashboardPage />", () => {
	it("mounts", () => {
		cy.mountPage(<CreatorDashboardPage />);
	});
});
