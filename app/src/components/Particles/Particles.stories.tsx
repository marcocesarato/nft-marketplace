import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import Particles from "@components/Particles";

export default {
	title: "Components / Media and Icons / Particles",
	component: Particles,
} as ComponentMeta<typeof Particles>;

const Template: ComponentStory<typeof Particles> = () => <Particles />;

export const Basic = Template.bind({});
