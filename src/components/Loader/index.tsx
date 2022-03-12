import {Center, Spinner, Text} from "@chakra-ui/react";

export default function Loader({message}): JSX.Element {
	return (
		<Center flex="1" flexDirection="column">
			<Spinner thickness="5px" speed="0.65s" color="blue.500" size="xl" />
			{message && <Text mt={10}>{message}</Text>}
		</Center>
	);
}
