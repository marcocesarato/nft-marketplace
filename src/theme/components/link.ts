export const linkStyles = {
	components: {
		Link: {
			// 3. We can add a new visual variant
			decoration: "none",
			baseStyle: {
				_hover: {
					textDecoration: "none",
					color: "purple.300",
				},
				_focus: {
					boxShadow: "none",
				},
			},
		},
	},
};
