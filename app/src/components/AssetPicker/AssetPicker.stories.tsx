import React, {MouseEvent} from "react";
import {Box, Image} from "@chakra-ui/react";
import {action} from "@storybook/addon-actions";
import {useArgs} from "@storybook/client-api";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import items from "@/cypress/fixtures/walletNFTs.json";
import {TokenItem} from "@app/types";
import AssetPicker from "@components/AssetPicker";

export default {
	title: "Components / Forms / Asset Picker",
	component: AssetPicker,
} as ComponentMeta<typeof AssetPicker>;

const actionChange = action("onChange");
const actionClean = action("onClean");

const Template: ComponentStory<typeof AssetPicker> = (args) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, updateArgs] = useArgs();
	const handle = (value: TokenItem | null | undefined) => {
		actionChange(value);
		updateArgs({...args, value});
	};
	const handleClean = (e: MouseEvent) => {
		actionClean(e);
		updateArgs({...args, value: null});
	};
	return (
		<>
			<Box>
				<Image src={args.value?.image} width={300} mb={4} />
			</Box>
			<AssetPicker {...args} onChange={handle} onClean={handleClean} />
		</>
	);
};

export const Basic = Template.bind({});
Basic.args = {
	value: null,
	items: items.data.walletNFTs,
	label: "Select",
	cleanLabel: "Clear",
};
