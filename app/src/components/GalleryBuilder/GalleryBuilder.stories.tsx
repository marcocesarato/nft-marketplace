import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import GalleryBuilder from "@components/GalleryBuilder";
import user from "@fixtures/user.json";
import {UsersDocument} from "@services/graphql/generated";

export default {
	title: "Components / Gallery / Builder",
	component: GalleryBuilder,
} as ComponentMeta<typeof GalleryBuilder>;

const Template: ComponentStory<typeof GalleryBuilder> = (args) => <GalleryBuilder />;

export const Basic = Template.bind({});
Basic.parameters = {
	apolloClient: {
		mocks: [
			{
				request: {
					query: UsersDocument,
				},
				result: user,
			},
		],
	},
};
