import {Box, Heading} from "@chakra-ui/react";

import Subtitle from "@components/Subititle";

export default function Header({title, subtitle}): JSX.Element {
	return (
		<Box mt="4" p="8" px={4} mb={4} textAlign={"center"} width="full">
			<Heading size="xl">{title}</Heading>
			<Subtitle>{subtitle}</Subtitle>
		</Box>
	);
}
