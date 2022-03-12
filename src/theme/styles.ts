import {mode} from "@chakra-ui/theme-tools";

export const globalStyles = {
	colors: {
		gray: {
			700: "#1f2733",
		},
		transparent: "transparent",
		black: "#000",
		white: "#fff",
	},
	styles: {
		global: (props) => ({
			body: {
				bg: mode("gray.50", "gray.800")(props),
			},
		}),
	},
};
