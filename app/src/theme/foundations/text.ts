import type {ComponentStyleConfig} from "@chakra-ui/theme";

const Button: ComponentStyleConfig = {
	variants: {
		"with-shadow": {
			boxShadow: "0 0 2px 2px #efdfde",
		},
	},
};

export const buttonStyles = {
	components: {
		Button,
	},
};
