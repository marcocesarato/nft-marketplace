import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Sidebar from "@layouts/Sidebar";

export default {
	title: "Layouts / Sidebar",
	component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	title: "Basic",
	position: "static",
	compress: false,
};
