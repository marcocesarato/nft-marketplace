import Link from "next/link";
import {
	Box,
	Button,
	Heading,
	HStack,
	Image,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Catalog from "@/src/components/Catalog/Catalog";
import Loading from "@components/Loading";
import Particles from "@components/Particles";
import {useMarketItemsQuery} from "@services/subgraph";
import {withMetadata} from "@utils/converters";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function Home(): JSX.Element {
	const {t} = useTranslation();
	const {data, loading, error} = useMarketItemsQuery();
	const items = withMetadata(data?.marketItems);
	return (
		<Box as="section" pb="7.5rem" flex={1}>
			<Box mx="auto" px={6}>
				<Box
					position="absolute"
					top="94px"
					width="100%"
					left={useBreakpointValue({base: "0", lg: "15px"})}
					bg={useColorModeValue("#805bd530", "#805bd515")}
					borderTopLeftRadius="15px">
					<Particles
						style={{
							height: "50vh",
							minHeight: "500px",
							filter: "blur(1px)",
						}}
					/>
				</Box>
				<HStack w="full" mb="6">
					<Box textAlign={{base: "center", xl: "left"}} p={4} w="full">
						<Heading
							as="h1"
							size="3xl"
							fontWeight="extrabold"
							maxW="48rem"
							lineHeight="1.2"
							letterSpacing="tight"
							mx={{base: "auto", xl: 0}}>
							{t("common:page.home.header.title")}
						</Heading>
						<Text fontSize="xl" mt="4" maxW="xl" mx={{base: "auto", xl: 0}}>
							{t("common:page.home.header.subtitle")}
						</Text>
						<Stack
							w="full"
							justify={{base: "center", xl: "flex-start"}}
							direction={{base: "column", md: "row"}}
							mt="10"
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
					</Box>
					<Image
						pt={6}
						d={{base: "none", xl: "block"}}
						src="/assets/images/metaverse.png"
						alt="metaverse"
					/>
				</HStack>
				{!error && loading ? <Loading /> : <Catalog data={items} sorting={false} />}
			</Box>
		</Box>
	);
}
