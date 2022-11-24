import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import user from "@/cypress/fixtures/user.json";
import GalleryBuilder from "@components/GalleryBuilder";
import {UsersDocument} from "@services/graphql/generated";

export default {
	title: "Components / GalleryBuilder",
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
