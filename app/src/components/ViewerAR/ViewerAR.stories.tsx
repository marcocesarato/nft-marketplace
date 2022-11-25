import React from "react";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import ViewerAR from "@components/ViewerAR";
import item from "@fixtures/marketItemOnSale.json";

export default {
	title: "Components / Data Display / Viewer AR",
	component: ViewerAR,
} as ComponentMeta<typeof ViewerAR>;

const Template: ComponentStory<typeof ViewerAR> = (args) => <ViewerAR {...args} />;

const actionClose = action("onClose");

export const Basic = Template.bind({});
Basic.args = {
	image: item.image,
	onClose: actionClose,
};
