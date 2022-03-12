import {Box, SimpleGrid} from "@chakra-ui/react";

export default function Catalog(props): JSX.Element {
	return (
		<Box mt={2} alignItems="flex-start">
			<SimpleGrid
				mx="auto"
				columns={{
					base: 2,
					md: 3,
					lg: 4,
					xl: 5,
				}}
				columnGap={{base: "4", md: "6"}}
				rowGap={{base: "8", md: "10"}}
				{...props}
			/>
		</Box>
	);
}
