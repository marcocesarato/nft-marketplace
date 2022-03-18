import {Box, HStack, Select, Text} from "@chakra-ui/react";

export default function CatalogBar({
	count,
	onFilter = (type: string, value: string) => {},
	onSort = (type: string, value: string) => {},
	sort = null,
	filters = null,
}) {
	return (
		<Box pb={10}>
			<HStack justifyContent="flex-end" gap={"1rem"}>
				<Text fontWeight="bold" flex={2} ml={4}>{`Products found: ${count}`}</Text>
				<Select
					flex={1}
					placeholder="Categories"
					marginTop={2}
					onChange={(e) => {
						onFilter("category", e.target.value);
					}}>
					<option value="/category/1">Category 1</option>
					<option value="/category/2">Category 2</option>
					<option value="/category/3">Category 3</option>
				</Select>
				<Select
					flex={1}
					placeholder="Sort by"
					marginTop={2}
					onChange={(e) => {
						onSort("sort", e.target.value);
					}}>
					<option value="lowest">Price(Lowest)</option>
					<option value="highest">Price(Highest)</option>
					<option value="az">Name(A-Z)</option>
					<option value="za">Name(Z-A)</option>
				</Select>
			</HStack>
		</Box>
	);
}
