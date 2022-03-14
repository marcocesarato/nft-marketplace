import {Box, useColorModeValue as mode, useStyleConfig} from "@chakra-ui/react";

function PanelContainer(props): JSX.Element {
	const {variant, children, ...rest} = props;
	const styles = useStyleConfig("PanelContainer", {variant});
	// Pass the computed styles into the `__css` prop
	return (
		<Box
			__css={styles}
			{...rest}
			boxShadow="xl"
			_before={mode("", {
				content: "''",
				width: "100%",
				height: "100%",
				position: "absolute",
				left: 0,
				top: 0,
				backgroundImage: "url(./assets/images/noise.gif)",
				zIndex: -1,
				opacity: 0.05,
			})}>
			{children}
		</Box>
	);
}

export default PanelContainer;
