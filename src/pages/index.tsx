import Link from "next/link";
import {Box, Button, Heading, Stack, Text} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Catalog from "@components/Catalog";
import Loading from "@components/Loading";
import Particles from "@components/Particles";
import Product from "@components/Product";
import useMarketItems from "@hooks/useMarketItems";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function Home(): JSX.Element {
	const {t} = useTranslation();
	const {data, isLoading} = useMarketItems();
	return (
		<Box as="section" pb="7.5rem" flex={1}>
			<Box mx="auto" px={6}>
				<Box
					position="absolute"
					top="94px"
					width="calc(100% - 30px)"
					left="15px"
					bg="rgba(0,0,0,0.1)"
					borderRadius="15px"
					borderBottomLeftRadius={0}
					borderBottomRightRadius={0}>
					<Particles
						style={{
							height: "50vh",
							minHeight: "500px",
							filter: "blur(2px)",
						}}
					/>
				</Box>
				<Box textAlign="center" marginTop={{base: "50px", md: "100px"}}>
					<Heading
						as="h1"
						size="3xl"
						fontWeight="extrabold"
						maxW="48rem"
						mx="auto"
						lineHeight="1.2"
						letterSpacing="tight">
						{t("common:page.home.header.title")}
					</Heading>
					<Text fontSize="xl" mt="4" maxW="xl" mx="auto">
						{t("common:page.home.header.subtitle")}
					</Text>
				</Box>
				<Stack
					justify="center"
					direction={{base: "column", md: "row"}}
					mt="10"
					mb="10"
					spacing="4">
					<Link href="/explore" passHref>
						<Button
							size="lg"
							colorScheme="purple"
							px="8"
							fontWeight="bold"
							fontSize="md">
							{t("common:page.home.header.exploreButton")}
						</Button>
					</Link>
					<Link href="/sell" passHref>
						<Button size="lg" px="8" fontWeight="bold" fontSize="md">
							{t("common:page.home.header.sellButton")}
						</Button>
					</Link>
				</Stack>
				{isLoading ? (
					<Loading />
				) : (
					<Catalog>
						{data.map((nft, i) => (
							<Product key={i} data={nft} />
						))}
					</Catalog>
				)}
			</Box>
		</Box>
	);
}
