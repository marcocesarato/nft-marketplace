import {
	Box,
	Heading,
	Image,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Address from "@components/Address";
import {useConfig} from "@contexts/Global";
import useIPFS from "@hooks/useIPFS";

export default function ProductDetails({data, onPurchase}): JSX.Element {
	const {resolveLink} = useIPFS();
	const {nativeToken} = useConfig();
	const {t} = useTranslation();
	return (
		<SimpleGrid columns={{base: 1, lg: 2}} spacing={{base: 8, md: 10}}>
			<Stack spacing={{base: 6, md: 10}}>
				<Image
					rounded={"md"}
					alt={data?.name}
					src={resolveLink(data?.image)}
					fit={"cover"}
					align={"center"}
					boxShadow="lg"
					w={"100%"}
					h={{base: "100%", sm: "400px", lg: "500px"}}
				/>
				{data?.attributes && data?.attributes.length > 0 && (
					<Text
						fontSize={{base: "16px", lg: "18px"}}
						color={mode("gray.900", "gray.400")}
						fontWeight={"500"}
						textTransform={"uppercase"}
						mb={"4"}>
						{t<string>("common:product.attributes")}
					</Text>
				)}
			</Stack>
			<Stack spacing={{base: 6, md: 10}}>
				<Box as={"header"}>
					<Heading
						lineHeight={1.1}
						fontWeight={600}
						mb={4}
						fontSize={{base: "2xl", sm: "4xl", lg: "5xl"}}>
						{data?.name}
					</Heading>
					{data?.creator && (
						<Address
							fontSize={"sm"}
							label={t<string>("common:product:createdBy")}
							address={data?.creator}
						/>
					)}
					{data?.seller && data?.seller !== data?.creator && (
						<Address
							fontSize={"sm"}
							label={t<string>("common:product:soldBy")}
							address={data?.seller}
						/>
					)}
				</Box>

				<Box>
					<Text
						fontSize={{base: "16px", lg: "18px"}}
						color={mode("gray.900", "gray.400")}
						fontWeight={"500"}
						textTransform={"uppercase"}
						mb={"4"}>
						{t<string>("common:product.description")}
					</Text>
					<Text fontSize={"lg"}>{data?.description || "No description."}</Text>
					{onPurchase && data?.price && (
						<Text fontWeight={300} fontSize={"2xl"} mt={5}>
							<Text as={"span"} fontWeight={"bold"}>
								{t<string>("common:product.price")}:
							</Text>{" "}
							{data?.priceFormatted || data?.price} {nativeToken?.symbol}
						</Text>
					)}
				</Box>
			</Stack>
		</SimpleGrid>
	);
}
