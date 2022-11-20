import React from "react";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import itemOnSale from "@/cypress/fixtures/marketItemOnSale.json";
import itemOwned from "@/cypress/fixtures/marketItemOwned.json";
import ProductCard from "@components/ProductCard";

export default {
	title: "Components / Product / Card",
	component: ProductCard,
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
