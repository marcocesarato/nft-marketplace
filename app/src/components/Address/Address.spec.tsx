import Address from "@components/Address";

describe("<Address />", () => {
	it("mounts", () => {
		cy.mount(
			<Address
				address="0x00000000000000000000000000000000000000f"
				name="Test"
				label="Address of"
			/>,
		);
	});
});
