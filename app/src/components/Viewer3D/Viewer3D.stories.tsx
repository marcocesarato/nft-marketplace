import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Product3D from "@components/Viewer3D";
import item from "@fixtures/marketItemOnSale.json";
import itemModel from "@fixtures/walletNFTAnimationModel.json";

export default {
	title: "Components / Data Display / 3D Viewer",
	component: Product3D,
} as ComponentMeta<typeof Product3D>;

const Template: ComponentStory<typeof Product3D> = (args) => <Product3D {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	data: item,
};
export const Model = Template.bind({});
Model.args = {
	data: itemModel,
};
