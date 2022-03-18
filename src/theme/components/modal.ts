import type {ComponentStyleConfig} from "@chakra-ui/theme";
import type {GlobalStyleProps} from "@chakra-ui/theme-tools";
import {mode} from "@chakra-ui/theme-tools";

const Modal: ComponentStyleConfig = {
	parts: ["content", "overlay"],
	baseStyle: (props: GlobalStyleProps) => ({
		dialog: {
			background: mode("gray.50", "gray.900")(props),
		},
		overlay: {
			bg: "none",
			backdropFilter: "auto",
			backdropBlur: "2px",
		},
	}),
};

export const modalStyles = {
	components: {
		Modal,
	},
};
