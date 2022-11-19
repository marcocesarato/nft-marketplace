describe("Public Navigation", () => {
	it("should navigate to the home page", () => {
		// Start from the index page
		cy.visit("/");
	});
	it("should navigate to the explore", () => {
		cy.visit("/explore");
	});
});
