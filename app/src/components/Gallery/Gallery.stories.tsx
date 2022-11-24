import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import user from "@/cypress/fixtures/user.json";
import Gallery from "@components/Gallery";

export default {
	title: "Components / Gallery / Gallery VR",
	component: Gallery,
} as ComponentMeta<typeof Gallery>;

const Template: ComponentStory<typeof Gallery> = (args) => <Gallery {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	user: user.data.user,
};
