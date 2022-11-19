import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Navbar from "@layouts/Navbar";

export default {
	title: "Layouts / Navbar",
	component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = () => <Navbar />;

export const Basic = Template.bind({});
