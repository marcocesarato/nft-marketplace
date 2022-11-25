import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Subtitle from "@components/Subtitle";

export default {
	title: "Components / Data Display / Subtitle",
	component: Subtitle,
} as ComponentMeta<typeof Subtitle>;

const Template: ComponentStory<typeof Subtitle> = (args) => <Subtitle {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	children: "Test",
};
