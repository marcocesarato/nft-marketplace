import {Box, Flex, useMediaQuery} from "@chakra-ui/react";

import useFixViewport from "./useFixViewport";

export default function Viewport({children, ...props}): JSX.Element {
	const [isStandalone] = useMediaQuery("(display-mode: standalone)");
	useFixViewport();

	return (
		<Flex
			direction="column"
			overflowX="auto"
			minH="100vh"
			w="full"
			maxW="100vw"
			style={
				!isStandalone
					? {
							minHeight: "calc(var(--vh, 1vh) * 100)",
					  }
					: {}
			}
			{...props}>
			<Box>{children}</Box>
		</Flex>
	);
}
