import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Header from "@components/Header";

export default {
	title: "Components / Data Display / Header",
	component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	title: "Test title",
	subtitle: "Test subtitle",
};
