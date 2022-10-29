import {mode} from "@chakra-ui/theme-tools";

type Dict = Record<string, any>;

const parts = ["container", "item", "label", "icon"];

const baseStyle = {
	container: {
		position: "fixed",
		display: "flex",
		justifyContent: "space-between",
		zIndex: 9999,

		px: 4,
		py: 2,
	},
	item: {
		flex: "1 1 0",
		flexBasis: "100%",
		fontSize: "small",
		mx: 0,
		opacity: 0.4,
		minHeight: "50px",
		borderRadius: "xl",
		justifyContent: "center",

		_selected: {
			opacity: 1,
			color: "primary",
			background: "rgba(128,91,213,0.3)",
		},
	},
	label: {
		_hidden: {
			opacity: 0,
			height: 0,
			width: 0,
			overflow: "hidden",
		},
	},
	icon: {
		fontSize: "xl",
	},
};

function variantFlat(props: Dict) {
	const {colorScheme: c} = props;

	return {
		container: {
			bottom: 0,
			left: 0,
			right: 0,
			padding: 4,

			color: mode(`${c}.900`, `#fff`)(props),
			bg: mode(`${c}.300`, `${c}.900`)(props),

			boxShadow: "lg",
		},
	};
}

function variantFloat(props: Dict) {
	const flatVariantStyles = variantFlat(props);

	return {
		...flatVariantStyles,
		container: {
			...flatVariantStyles.container,

			bottom: 4,
			left: 4,
			right: 4,

			borderRadius: "lg",
		},
	};
}

const variants = {
	flat: variantFlat,
	float: variantFloat,
};

const defaultProps = {
	variant: "float",
	colorScheme: "gray",
};

const BottomNavigation = {
	parts,
	baseStyle,
	variants,
	defaultProps,
};

export const BottomNavigationComponent = {
	components: {
		BottomNavigation,
	},
};
