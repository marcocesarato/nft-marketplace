import React from "react";
import {action} from "@storybook/addon-actions";
import {useArgs} from "@storybook/client-api";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import {TextureAsset} from "@app/types";
import TexturePicker from "@components/TexturePicker";

export default {
	title: "Components / Texture Picker",
	component: TexturePicker,
} as ComponentMeta<typeof TexturePicker>;

const Template: ComponentStory<typeof TexturePicker> = (args) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, updateArgs] = useArgs();
	const handle = (value: TextureAsset) => {
		action("changeTexture");
		updateArgs({...args, value});
	};
	return <TexturePicker {...args} onChange={handle} />;
};

export const Basic = Template.bind({});
Basic.args = {
	value: "",
};
