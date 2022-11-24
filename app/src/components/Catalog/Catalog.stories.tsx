import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import items from "@/cypress/fixtures/marketItemsFavourites.json";
import itemsOwned from "@/cypress/fixtures/walletNFTs.json";
import Catalog from "@components/Catalog";

export default {
	title: "Components / Data Display / Catalog",
	component: Catalog,
} as ComponentMeta<typeof Catalog>;

const Template: ComponentStory<typeof Catalog> = (args) => <Catalog {...args} />;

export const Basic = Template.bind({});
Basic.args = {
	data: items.data.marketItems,
};

export const Owned = Template.bind({});
Owned.args = {
	data: itemsOwned.data.walletNFTs,
};

export const Purchasable = Template.bind({});
Purchasable.args = {
	data: items.data.marketItems,
	purchasable: true,
};

export const NotSortable = Template.bind({});
NotSortable.args = {
	data: itemsOwned.data.walletNFTs,
	sortable: false,
};
