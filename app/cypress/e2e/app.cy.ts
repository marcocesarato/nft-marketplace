describe("Public Navigation", () => {
	it("should navigate to the home page", () => {
		// Start from the index page
		cy.visit("http://localhost:3000/");
	});
	it("should navigate to the explore", () => {
		cy.visit("http://localhost:3000/explore");
	});
});
