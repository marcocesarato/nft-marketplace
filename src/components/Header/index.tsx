import {Box, Heading, Text, useColorModeValue} from "@chakra-ui/react";

export default function Header({title, subtitle}): JSX.Element {
	return (
		<Box mt="4" p="8" px={4} mb={4} textAlign={"center"} width="full">
			<Heading size="xl">{title}</Heading>
			<Text color={useColorModeValue("gray.600", "gray.400")} fontSize="md" mt={2}>
				{subtitle}
			</Text>
		</Box>
	);
}
