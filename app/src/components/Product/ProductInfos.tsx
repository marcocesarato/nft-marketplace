import {useMemo, useRef, useState} from "react";
import NextLink from "next/link";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Heading,
	Image,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Progress,
	SimpleGrid,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tr,
	useColorModeValue,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {TokenAttribute, TokenItem} from "@app/types";
import Address from "@components/Address";
import {useConfig} from "@contexts/Global";
import useContainerDimensions from "@hooks/useContainerDimensions";
import useIPFS from "@hooks/useIPFS";
import {getAssetUrl} from "@utils/url";

type ProductInfoProps = {
	data: TokenItem;
	id?: string;
	showPreview?: boolean;
	showQRCode?: boolean;
	onPurchase?: Function;
};

export default function ProductInfos({
	id = "Product-" + Math.random(),
	showPreview = true,
	showQRCode = true,
	data,
	onPurchase = () => {},
}: ProductInfoProps): JSX.Element {
	const containerRef = useRef();
	const [imageFullscreen, setImageFullscreen] = useState<boolean>(false);
	const {width: imageWidth} = useContainerDimensions(containerRef);
	const {resolveLink} = useIPFS();
	const {symbol} = useConfig();
	const {t} = useTranslation();
	const textColor = useColorModeValue("gray.900", "gray.400");
	const fullscreenBg = useColorModeValue("gray.100", "gray.900");
	const fullscreenStyle = useMemo(() => {
		if (imageFullscreen) {
			return {
				position: "fixed",
				width: "full",
				height: "full",
				objectFit: "contain",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 9999,
				backgroundColor: fullscreenBg,
			} as any;
		}
		return {} as any;
	}, [fullscreenBg, imageFullscreen]);

	const content = (
		<Box id={id}>
			<Box as={"header"}>
				<Heading
					lineHeight={1.1}
					fontWeight={600}
					mb={4}
					fontSize={{base: "2xl", sm: "4xl", lg: "5xl"}}>
					{data?.name}
				</Heading>
				{data?.creator ? (
					<Address
						fontSize={"sm"}
						label={t<string>("common:product:createdBy")}
						address={data.creator}
						alignItems="center"
					/>
				) : (
					<Address
						fontSize={"sm"}
						label={t<string>("common:product:ownedBy")}
						address={data.owner_of}
						alignItems="center"
					/>
				)}
				{data?.seller && data?.seller !== data?.creator && (
					<Address
						fontSize={"sm"}
						label={t<string>("common:product:soldBy")}
						address={data?.seller}
					/>
				)}
				{showQRCode && (
					<Popover>
						<PopoverTrigger>
							<Button my={4}>{t<string>("common:product:qrcode")}</Button>
						</PopoverTrigger>
						<PopoverContent w="auto">
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverHeader>{t<string>("common:product:qrcode")}</PopoverHeader>
							<PopoverBody>
								<Image
									src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
										getAssetUrl(data),
									)}`}
									width={150}
									height={150}
								/>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				)}
			</Box>

			<Accordion defaultIndex={[0]} allowMultiple>
				<AccordionItem>
					<AccordionButton>
						<Box flex="1" textAlign="left" fontWeight="bold">
							{t<string>("common:product.description")}
						</Box>
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4}>{data?.description || "No description."}</AccordionPanel>
				</AccordionItem>

				{data.external_url && (
					<AccordionItem>
						<AccordionButton>
							<Box flex="1" textAlign="left" fontWeight="bold">
								{t<string>("common:product.externalUrl")}
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<NextLink href={data.external_url}>{data.external_url}</NextLink>
						</AccordionPanel>
					</AccordionItem>
				)}

				{data?.attributes && data?.attributes.length > 0 && (
					<AccordionItem>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								{t<string>("common:product.attributes")}
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<TableContainer>
								<Table>
									<Tbody>
										{data?.attributes.map((attribute: TokenAttribute) => (
											<Tr key={attribute.trait_type}>
												<Td>
													<Text fontWeight={"bold"}>
														{attribute.trait_type}
													</Text>
												</Td>
												<Td>
													{attribute.display_type === "date" ? (
														<Text>
															{new Date(
																attribute.value,
															).toLocaleDateString()}
														</Text>
													) : attribute.display_type === "url" ? (
														<Text>
															<NextLink href={attribute.value}>
																{attribute.value}
															</NextLink>
														</Text>
													) : attribute.display_type ===
															"boost_percentage" ||
													  attribute.display_type === "percentage" ? (
														<Progress
															value={parseInt(attribute.value)}
														/>
													) : (
														<Text>{attribute.value}</Text>
													)}
												</Td>
											</Tr>
										))}
									</Tbody>
								</Table>
							</TableContainer>
						</AccordionPanel>
					</AccordionItem>
				)}
			</Accordion>

			<Box>
				{onPurchase && data?.price && (
					<Text fontWeight={300} fontSize={"2xl"} mt={5}>
						<Text as={"span"} fontWeight={"bold"}>
							{t<string>("common:product.price")}:
						</Text>{" "}
						{data?.price_formatted || data?.price} {symbol}
					</Text>
				)}
			</Box>
		</Box>
	);

	if (!showPreview) return content;

	return (
		<SimpleGrid columns={{base: 1, lg: 2}} spacing={{base: 8, md: 10}}>
			<Stack spacing={{base: 6, md: 10}} ref={containerRef}>
				<Image
					rounded={"md"}
					alt={data?.name}
					src={resolveLink(data?.image)}
					fit={"cover"}
					fallbackSrc="/assets/images/empty.jpg"
					align={"center"}
					boxShadow="lg"
					width={`${imageWidth}px`}
					height={`${imageWidth}px`}
					cursor="pointer"
					onClick={() => setImageFullscreen((fullscreen) => !fullscreen)}
					{...fullscreenStyle}
				/>
				{data?.attributes && data?.attributes.length > 0 && (
					<Text
						fontSize={{base: "16px", lg: "18px"}}
						color={textColor}
						fontWeight={"500"}
						textTransform={"uppercase"}
						mb={"4"}>
						{t<string>("common:product.attributes")}
					</Text>
				)}
			</Stack>
			<Stack spacing={{base: 6, md: 10}}>{content}</Stack>
		</SimpleGrid>
	);
}
