import {mode} from "@chakra-ui/theme-tools";

const PanelContainer = {
	baseStyle: (props) => ({
		minHeight: "calc(100vh - 94px)",
		maxHeight: "calc(100vh - 94px)",
		overflowY: "auto",
		borderTopLeftRadius: "15px",
		marginLeft: {lg: "15px"},
		display: "flex",
		background: mode("gray.50", "gray.800")(props),
	}),
};

export const PanelContainerComponent = {
	components: {
		PanelContainer,
	},
};
