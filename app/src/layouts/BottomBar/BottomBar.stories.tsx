import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import BottomBar from "@layouts/BottomBar";

export default {
	title: "Layouts / Mobile / BottomBar",
	component: BottomBar,
} as ComponentMeta<typeof BottomBar>;

const Template: ComponentStory<typeof BottomBar> = () => <BottomBar />;

export const Basic = Template.bind({});
