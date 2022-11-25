import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Loading from "@components/Loading";

export default {
	title: "Components / Feedback / Loading",
	component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = () => <Loading />;

export const Basic = Template.bind({});
