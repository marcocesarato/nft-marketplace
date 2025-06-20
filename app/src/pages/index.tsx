import Link from "next/link";
import {
	Box,
	Button,
	Heading,
	HStack,
	Image,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Catalog from "@components/Catalog";
import Loading from "@components/Loading";
import Particles from "@components/Particles";
import useSidebar from "@hooks/useSidebar";
import {useMarketItemsOnSaleQuery} from "@services/graphql";
import {toTokenItems} from "@utils/converters";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function HomePage(): JSX.Element {
	const {t} = useTranslation();
	const {isSidebarCompress} = useSidebar();
	const {data, loading, error} = useMarketItemsOnSaleQuery();
	const items = toTokenItems(data?.marketItems);
	return (
		<Box as="section" flex={1}>
			<Box position="relative">
				<Box
					position="absolute"
					top="0"
					width="100%"
					left={0}
					bg={useColorModeValue(
						"linear-gradient(180deg, rgba(128,91,213,0.3) 60%, rgba(9,9,121,0) 100%)",
						"linear-gradient(180deg, rgba(128,91,213,0.15) 60%, rgba(9,9,121,0) 100%)",
					)}
					borderTopLeftRadius="15px">
					<Particles
						style={{
							height: "50vh",
							minHeight: "500px",
							filter: "blur(1px)",
						}}
					/>
				</Box>
			</Box>
			<Box mx="auto" px={6} pb={4} overflowX="hidden">
				<HStack w="full" mb="6" mt={{base: 6, xl: 0}}>
					<Box
						textAlign={{
							base: "center",
							md: isSidebarCompress ? "left" : "center",
							xl: "left",
						}}
						p={4}
						w="full">
						<Heading
							as="h1"
							size="3xl"
							fontWeight="extrabold"
							maxW="48rem"
							lineHeight="1.2"
							letterSpacing="tight"
							mx={{base: "auto", xl: 0}}>
							{t<string>("common:page.home.header.title")}
						</Heading>
						<Text fontSize="xl" mt="4" maxW="xl" mx={{base: "auto", xl: 0}}>
							{t<string>("common:page.home.header.subtitle")}
						</Text>
						<Stack
							w="full"
							justify={{
								base: "center",
								md: isSidebarCompress ? "flex-start" : "center",
								xl: "flex-start",
							}}
							direction={{base: "column", md: "row"}}
							mt="10"
							spacing="4">
							<Link href="/explore" passHref legacyBehavior>
								<Button
									size="lg"
									colorScheme="purple"
									px="8"
									fontWeight="bold"
									fontSize="md">
									{t<string>("common:page.home.header.exploreButton")}
								</Button>
							</Link>
							<Link href="/sell" passHref legacyBehavior>
								<Button size="lg" px="8" fontWeight="bold" fontSize="md">
									{t<string>("common:page.home.header.sellButton")}
								</Button>
							</Link>
						</Stack>
					</Box>
					<Image
						pt={6}
						display={{
							base: "none",
							md: isSidebarCompress ? "block" : "none",
							xl: "block",
						}}
						src="/assets/images/metaverse.png"
						alt="metaverse"
					/>
				</HStack>
				{!error && loading ? (
					<Loading />
				) : (
					<Catalog data={items} sortable={false} purchasable />
				)}
			</Box>
		</Box>
	);
}
