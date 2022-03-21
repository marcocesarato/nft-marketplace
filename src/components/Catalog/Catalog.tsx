import {Box, SimpleGrid} from "@chakra-ui/react";

import Product from "@components/Product";

import CatalogFilterBar from "./CatalogFilterBar";

export default function Catalog({
	data = [],
	sorting = true,
	onPurchase = null,
	...props
}): JSX.Element {
	const handlePurchase = (product): (() => {}) => {
		if (onPurchase) {
			return () => onPurchase(product);
		}
	};
	return (
		<Box mt={2} alignItems="flex-start">
			{sorting && <CatalogFilterBar count={data?.length || 0} {...props} />}
			<SimpleGrid
				mx="auto"
				columns={{
					base: 2,
					md: 3,
					xl: 4,
				}}
				columnGap={{base: "4", md: "6"}}
				rowGap={{base: "8", md: "10"}}
				{...props}>
				{data.map((product, i: number) => (
					<Product
						key={product?.token_id || i}
						data={product}
						onPurchase={handlePurchase(product)}
					/>
				))}
			</SimpleGrid>
		</Box>
	);
}
