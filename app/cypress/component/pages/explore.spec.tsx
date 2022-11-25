import React from "react";

import ExplorePage from "@pages/explore";

describe("<ExplorePage />", () => {
	it("mounts", () => {
		cy.mountPage(<ExplorePage />);
	});
});
