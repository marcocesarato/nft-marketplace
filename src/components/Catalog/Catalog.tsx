import {useState} from "react";
import {useRouter} from "next/router";
import {Box, SimpleGrid, useBreakpointValue} from "@chakra-ui/react";
import {motion} from "framer-motion";

import Product from "@components/Product";
import useAccount from "@hooks/useAccount";
import useMarket from "@hooks/useMarket";

import CatalogFilterBar from "./CatalogFilterBar";

const easing = [0.6, -0.05, 0.01, 0.99];
const MotionSimpleGrid = motion(SimpleGrid);
const catalogVariant = {
	initial: {},
	animate: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};
const productVariant = {
	initial: {
		y: 60,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: easing,
		},
	},
};

const sort = {
	"newest": (a, b) => b?.price - a?.price || a?.tokenId - b?.tokenId,
	"lowest": (a, b) => a?.price - b?.price || a?.tokenId - b?.tokenId,
	"highest": (a, b) => Date.parse(b?.createdAt) - Date.parse(a?.createdAt),
	"likes": (a, b) => a?.likes - b?.likes || a?.tokenId - b?.tokenId,
};

export default function Catalog({
	data = [],
	sortable = true,
	purchasable = false,
	...props
}): JSX.Element {
	const router = useRouter();
	const {isAuthenticated} = useAccount();
	const {purchase} = useMarket();
	const handlePurchase = (product): (() => {}) => {
		if (isAuthenticated && purchasable) {
			return () => purchase(product.tokenId, product.price, () => router.push("/assets"));
		}
	};
	const minColumns = useBreakpointValue({base: 2, sm: 3, lg: 4, xl: 5});
	const emptyItems = Math.max(minColumns - data.length, 0);

	const [sortBy, setSortBy] = useState<string>();

	return (
		<Box mt={2} alignItems="flex-start" maxW="1680px">
			{sortable && <CatalogFilterBar onSort={setSortBy} {...props} />}
			<MotionSimpleGrid
				variants={catalogVariant}
				mx="auto"
				minChildWidth={{base: "40vw", md: "250px"}}
				initial="initial"
				animate="animate"
				columnGap={{base: "4", md: "6"}}
				rowGap={{base: "8", md: "10"}}
				{...props}>
				{[...data]
					.sort((a, b) => (sortBy && sort[sortBy](a, b)) || sort["newest"](a, b))
					.map((product, i: number) => (
						<Product
							variants={productVariant}
							key={product?.token_address + product?.token_id || i}
							data={product}
							onPurchase={handlePurchase(product)}
						/>
					))}
				{emptyItems > 0 &&
					Array(emptyItems)
						.fill(null)
						.map((_, i) => (
							<Box minW={{base: "40vw", md: "250px"}} key={`placeholder-${i}`} />
						))}
			</MotionSimpleGrid>
		</Box>
	);
}
