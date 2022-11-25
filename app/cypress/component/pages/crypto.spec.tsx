import React from "react";

import CryptoPage from "@pages/crypto";

describe("<CryptoPage />", () => {
	it("mounts", () => {
		cy.mountPage(<CryptoPage />);
	});
});
