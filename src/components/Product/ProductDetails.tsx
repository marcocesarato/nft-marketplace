import {
	Box,
	Heading,
	Image,
	SimpleGrid,
	Stack,
	StackDivider,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {useConfig} from "@contexts/Global";

export default function ProductDetails({data, onPurchase}): JSX.Element {
	const {nativeToken} = useConfig();
	const {t} = useTranslation();
	return (
		<SimpleGrid columns={{base: 1, lg: 2}} spacing={{base: 8, md: 10}}>
			<Image
				rounded={"md"}
				alt={"product image"}
				src={data?.image}
				fit={"cover"}
				align={"center"}
				boxShadow="lg"
				w={"100%"}
				h={{base: "100%", sm: "400px", lg: "500px"}}
			/>
			<Stack spacing={{base: 6, md: 10}}>
				<Box as={"header"}>
					<Heading
						lineHeight={1.1}
						fontWeight={600}
						fontSize={{base: "2xl", sm: "4xl", lg: "5xl"}}>
						{data?.name}
					</Heading>
					{onPurchase && (
						<Text fontWeight={300} fontSize={"2xl"} mt={5}>
							<Text as={"span"} fontWeight={"bold"}>
								{t("common:product.price")}:
							</Text>{" "}
							{data?.price} {nativeToken?.symbol}
						</Text>
					)}
				</Box>

				<Stack
					spacing={{base: 4, sm: 6}}
					direction={"column"}
					divider={
						<StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />
					}>
					<Box>
						<Text
							fontSize={{base: "16px", lg: "18px"}}
							color={useColorModeValue("gray.900", "gray.400")}
							fontWeight={"500"}
							textTransform={"uppercase"}
							mb={"4"}>
							{t("common:product.description")}
						</Text>
						<Text fontSize={"lg"}>{data?.description || "No description."}</Text>
					</Box>
				</Stack>
			</Stack>
		</SimpleGrid>
	);
}
