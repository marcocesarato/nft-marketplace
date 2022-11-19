import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import items from "@/cypress/fixtures/marketItemsFavourites.json";
import itemsOwned from "@/cypress/fixtures/walletNFTs.json";
import ProductCard from "@components/ProductCard";

export default {
	title: "Components / Product / Card",
	component: ProductCard,
} as ComponentMeta<typeof ProductCard>;

const Template: ComponentStory<typeof ProductCard> = (args) => <ProductCard {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	data: items.data.marketItems[0],
	maxW: 350,
};
export const Owned = Template.bind({});
Owned.args = {
	data: itemsOwned.data.walletNFTs[0],
	maxW: 350,
};
export const Purchasable = Template.bind({});
Purchasable.args = {
	data: items.data.marketItems[0],
	onPurchase: () => {},
	maxW: 350,
};
