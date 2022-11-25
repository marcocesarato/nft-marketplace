import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import BuyCrypto from "@components/BuyCrypto";

export default {
	title: "Components / Forms / Buy Crypto",
	component: BuyCrypto,
} as ComponentMeta<typeof BuyCrypto>;

const Template: ComponentStory<typeof BuyCrypto> = () => <BuyCrypto />;

export const Basic = Template.bind({});
