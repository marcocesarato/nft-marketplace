import type {ComponentStyleConfig} from "@chakra-ui/theme";
import type {GlobalStyleProps} from "@chakra-ui/theme-tools";
import {mode} from "@chakra-ui/theme-tools";

const Menu: ComponentStyleConfig = {
	parts: ["list", "divider", "item"],
	baseStyle: (props: GlobalStyleProps) => ({
		list: {
			"&:focus:not([data-focus-visible-added])": {
				shadow: "lg",
			},
			borderWidth: 0,
			shadow: "lg",
			bg: mode("gray.50", "gray.800")(props),
		},
		divider: {
			borderColor: mode("gray.300", "gray.500")(props),
		},
		item: {
			fontSize: "sm",
			fontWeight: "light",
		},
	}),
};

export const menuStyles = {
	components: {
		Menu,
	},
};
