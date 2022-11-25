import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Viewer3D from "@components/Viewer3D";
import item from "@fixtures/marketItemOnSale.json";
import itemModel from "@fixtures/walletNFTAnimationModel.json";

export default {
	title: "Components / Data Display / Viewer 3D",
	component: Viewer3D,
} as ComponentMeta<typeof Viewer3D>;

const Template: ComponentStory<typeof Viewer3D> = (args) => <Viewer3D {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	data: item,
};
export const Model = Template.bind({});
Model.args = {
	data: itemModel,
};
