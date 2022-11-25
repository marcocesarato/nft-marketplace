import React from "react";

import GalleryPage from "@pages/gallery";

describe("<GalleryPage />", () => {
	it("mounts", () => {
		cy.mountPage(<GalleryPage />);
	});
});
