import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Loader from "@components/Loader";

export default {
	title: "Components / Feedback / Loader",
	component: Loader,
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Basic = Template.bind({});
export const WithMessage = Template.bind({});
WithMessage.args = {
	message: "Loading...",
};
