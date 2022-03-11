import {Box, Heading, Text, useColorModeValue} from "@chakra-ui/react";

export default function Header({title, subtitle}) {
	return (
		<Box p="8" px={4} mb={4} textAlign={"center"}>
			<Heading size="xl">{title}</Heading>
			<Text color={useColorModeValue("gray.600", "gray.400")} fontSize="md" mt={2}>
				{subtitle}
			</Text>
		</Box>
	);
}
