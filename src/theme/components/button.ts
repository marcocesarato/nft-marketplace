export const buttonStyles = {
	components: {
		Button: {
			variants: {
				"no-hover": {
					_hover: {
						boxShadow: "none",
					},
				},
				"transparent-with-icon": {
					bg: "transparent",
					fontWeight: "bold",
					borderRadius: "inherit",
					cursor: "pointer",
					_active: {
						bg: "transparent",
						transform: "none",
						outline: "none",
						borderColor: "transparent",
					},
					_focus: {
						outline: "none",
						boxShadow: "none",
						borderColor: "transparent",
					},
					_hover: {
						outline: "none",
						boxShadow: "none",
						borderColor: "transparent",
					},
				},
			},
			baseStyle: {
				borderRadius: "15px",
				_focus: {
					boxShadow: "none",
				},
			},
		},
	},
};
