import {Box, useColorModeValue} from "@chakra-ui/react";

export default function Container({children, ...props}): JSX.Element {
	const background = useColorModeValue("gray.50", "gray.800");
	return (
		<Box flex={1} bg={background} {...props}>
			{children}
		</Box>
	);
}
