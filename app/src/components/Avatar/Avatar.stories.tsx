import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Avatar from "@components/Avatar";

export default {
	title: "Components / Avatar",
	component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

const size = 64;
const address = "0x00000000000000000000000000000000000000f";
const ensImage =
	"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

export const Basic = Template.bind({});
Basic.args = {
	address,
	size,
};

export const Image = Template.bind({});
Image.args = {
	address,
	size,
	ensImage,
};
