import {mode} from "@chakra-ui/theme-tools";

import colors from "./foundations/colors";

export const globalStyles = {
	colors,
	styles: {
		global: (props) => ({
			body: {
				bg: mode("gray.50", "gray.800")(props),
			},
			"h1, h2, h3, h4, h5, h6": {
				color: mode("black", "white")(props),
				textShadow: "0 0 80px #a980e964, 0 0 32px #9461e332",
			},
			"&::-webkit-scrollbar": {
				width: "0",
				borderRadius: "15px",
				backgroundColor: `rgba(0, 0, 0, 0)`,
			},
			"&::-webkit-scrollbar-thumb": {
				backgroundColor: "transparent",
			},
			"body::before": {
				content: "''",
				"backgroundImage": "url(/assets/images/header.jpg)",
				WebkitMaskImage: "linear-gradient(to top, transparent 0%, #00000088 100%)",
				opacity: 0.7,
				top: "0",
				left: "0",
				width: "100%",
				filter: "blur(80px)",
				height: "200px",
				zIndex: "0",
				position: "absolute",
				transform: "scale(1.5)",
				backgroundPosition: "center",
			},
		}),
	},
};
