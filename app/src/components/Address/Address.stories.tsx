import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Address from "@components/Address";

export default {
	title: "Components / Address",
	component: Address,
} as ComponentMeta<typeof Address>;

const Template: ComponentStory<typeof Address> = (args) => <Address {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	address: "0x00000000000000000000000000000000000000f",
};

export const WithName = Template.bind({});
WithName.args = {
	address: "0x00000000000000000000000000000000000000f",
	name: "Test",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
	address: "0x00000000000000000000000000000000000000f",
	name: "Test",
	label: "Created by",
};
