import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Gallery from "@components/Gallery";
import user from "@fixtures/user.json";

export default {
	title: "Components / Gallery / Virtual Space",
	component: Gallery,
} as ComponentMeta<typeof Gallery>;

const Template: ComponentStory<typeof Gallery> = (args) => <Gallery {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	user: user.data.user,
};
