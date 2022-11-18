import Avatar from "@components/Avatar";

describe("<Avatar />", () => {
	it("mounts", () => {
		const size = 64;
		cy.mount(<Avatar address="0x00000000000000000000000000000000000000f" size={size} />)
			.get("svg")
			.parent()
			.should("have.css", "width", `${size}px`)
			.should("have.css", "height", `${size}px`);
	});
});
