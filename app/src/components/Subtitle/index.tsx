import {Text, useColorModeValue} from "@chakra-ui/react";

export default function Subtitle(props): JSX.Element {
	return (
		<Text color={useColorModeValue("gray.600", "gray.400")} fontSize="md" my={2} {...props} />
	);
}
