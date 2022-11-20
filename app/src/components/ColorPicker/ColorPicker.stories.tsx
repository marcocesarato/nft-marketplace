import React from "react";
import {action} from "@storybook/addon-actions";
import {useArgs} from "@storybook/client-api";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import ColorPicker from "@components/ColorPicker";

export default {
	title: "Components / Color Picker",
	component: ColorPicker,
} as ComponentMeta<typeof ColorPicker>;

const Template: ComponentStory<typeof ColorPicker> = (args) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, updateArgs] = useArgs();
	const handle = (value: string) => {
		action("changeColor");
		updateArgs({...args, value});
	};
	return <ColorPicker {...args} onChange={handle} />;
};

export const Basic = Template.bind({});
Basic.args = {
	value: "",
};
