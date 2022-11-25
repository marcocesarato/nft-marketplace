import React from "react";

import AccountPage from "@pages/account/[id]";

describe("<AccountPage />", () => {
	it("mounts", () => {
		cy.mountPage(<AccountPage />);
	});
});
