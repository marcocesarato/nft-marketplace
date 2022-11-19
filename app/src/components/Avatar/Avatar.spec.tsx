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

	it("mounts with ensImage", () => {
		const size = 64;
		cy.mount(
			<Avatar
				address="0x00000000000000000000000000000000000000f"
				size={size}
				ensImage="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
			/>,
		)
			.get("img")
			.parent()
			.should("have.css", "width", `${size}px`)
			.should("have.css", "height", `${size}px`);
	});
});
