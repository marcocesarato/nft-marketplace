import React from "react";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Address from "@components/Address";
import ProductModal from "@components/Product/ProductModal";
import ProductCard from "@components/ProductCard";
import itemOnSale from "@fixtures/marketItemOnSale.json";
import itemOwned from "@fixtures/marketItemOwned.json";

export default {
	title: "Components / Data Display / Product Card",
	component: ProductCard,
	subcomponents: {ProductModal, Address},
} as ComponentMeta<typeof ProductCard>;

const Template: ComponentStory<typeof ProductCard> = (args) => <ProductCard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	data: itemOnSale,
	maxW: 350,
};

const actionPurchase = action("onPurchase");

export const Owned = Template.bind({});
Owned.args = {
	data: itemOwned,
	maxW: 350,
};
export const Purchasable = Template.bind({});
Purchasable.args = {
	data: itemOnSale,
	onPurchase: (e) => {
		actionPurchase(e);
	},
	maxW: 350,
};
