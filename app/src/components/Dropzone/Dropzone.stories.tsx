import React from "react";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Dropzone, {DropzoneType} from "@components/Dropzone";
import user from "@fixtures/user.json";

export default {
	title: "Components / Forms / Dropzone",
	component: Dropzone,
} as ComponentMeta<typeof Dropzone>;

const actionFileAccepted = action("onFileAccepted");

const Template: ComponentStory<typeof Dropzone> = (args) => <Dropzone {...args} />;
export const Basic = Template.bind({});
Basic.args = {
	user: user.data.user,
	onFileAccepted: actionFileAccepted,
};
export const WithImageType = Template.bind({});
WithImageType.args = {
	type: DropzoneType.Image,
	onFileAccepted: actionFileAccepted,
};
export const WithAnimationType = Template.bind({});
WithAnimationType.args = {
	type: DropzoneType.Animation,
	onFileAccepted: actionFileAccepted,
};
