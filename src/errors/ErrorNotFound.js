import {Center, Box, Stack, Heading, Text, useColorModeValue} from "@chakra-ui/react";
import {WarningTwoIcon} from "@chakra-ui/icons";

export default function ErrorNotFound() {
	return (
		<Center flex="1" p="8">
			<Stack direction={{base: "column", md: "row"}} align="center" spacing="0">
				<WarningTwoIcon boxSize={75} color={"orange.300"} mr={50} />
				<Box textAlign={{base: "center", md: "left"}}>
					<Heading>Error 404</Heading>
					<Text color={useColorModeValue("gray.600", "gray.400")}>
						The page does not exist or the url has changed.
					</Text>
				</Box>
			</Stack>
		</Center>
	);
}
