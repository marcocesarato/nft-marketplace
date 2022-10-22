import {mode} from "@chakra-ui/theme-tools";

export const drawerStyles = {
	components: {
		Drawer: {
			parts: ["overlay", "dialog"],
			baseStyle: (props) => ({
				overlay: {
					bg: "none",
					backdropFilter: "auto",
					backdropBlur: "5px",
				},
				dialog: {
					bg: mode("white", "gray.800")(props),
				},
			}),
			// 3. We can add a new visual variant
			variants: {
				"with-shadow": {
					placement: "right",
					boxShadow: "0 0 2px 2px #efdfde",
					bgColor: "red",
				},
			},
		},
	},
};
