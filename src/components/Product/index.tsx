import {AiOutlineShoppingCart} from "react-icons/ai";
import {
	Box,
	Button,
	Heading,
	HStack,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {useTranslation} from "next-i18next";

import {useConfig} from "@contexts/Global";
import useIPFS from "@hooks/useIPFS";
import {formatAddress} from "@utils/formatters";

import ProductModal from "./ProductModal";

const MotionStack = motion(Stack);
export default function Product({data, onPurchase = null, ...rootProps}): JSX.Element {
	const {t} = useTranslation();
	const {nativeToken} = useConfig();
	const {resolveLink} = useIPFS();
	const {isOpen, onOpen, onClose} = useDisclosure();
	return (
		<>
			<MotionStack
				pt={12}
				spacing={useBreakpointValue({base: "4", md: "5"})}
				zIndex={0}
				{...rootProps}>
				<Box
					role={"group"}
					w={"full"}
					bg={useColorModeValue("gray.200", "gray.900")}
					rounded={"lg"}
					pos={"relative"}
					zIndex={1}>
					<Box
						mx={6}
						rounded={"lg"}
						mt={-12}
						pos={"relative"}
						_before={{
							transition: "all .5s ease",
							content: '""',
							w: "full",
							h: 0,
							paddingTop: "100%",
							pos: "absolute",
							top: 2,
							left: 0,
							background: `url(${resolveLink(data?.image)}) #333`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							transform: "rotate(0)",
							filter: `blur(15px) brightness(${useColorModeValue("80%", "50%")})`,
							zIndex: -1,
						}}
						_groupHover={{
							_before: {
								filter: "blur(25px)",
								transform: "rotate(5deg)",
							},
						}}>
						<Box
							transition="all .3s ease"
							w="full"
							h={0}
							paddingTop="100%"
							borderRadius="md"
							cursor="pointer"
							onClick={onOpen}
							background={`url(${resolveLink(data?.image)}) #333`}
							backgroundSize="cover"
							backgroundPosition="center"
							_hover={{
								transform: "scale(1.1)",
							}}
						/>
					</Box>
					<Stack p={6} pt={10} align={"center"}>
						<Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
							{t("common:product.item")}
						</Text>
						<Heading
							fontSize={"2xl"}
							fontFamily={"body"}
							fontWeight={500}
							cursor="pointer"
							onClick={onOpen}>
							{data?.name}
						</Heading>
						{data?.creator && (
							<Text fontSize={"sm"}>
								{t("common:product:createdBy")} {formatAddress(data.creator)}
							</Text>
						)}
					</Stack>
					{onPurchase && (
						<HStack
							opacity={0.8}
							alignItems="center"
							justifyContent="space-between"
							p={4}
							roundedBottom="lg">
							{data?.price && (
								<Stack direction={"row"} align={"center"}>
									<Text fontWeight="medium" fontSize={"lg"}>
										{data?.priceFormatted || data?.price} {nativeToken?.symbol}
									</Text>
								</Stack>
							)}
							<Button
								px={4}
								py={1}
								bg="gray.600"
								color="gray.100"
								fontWeight="medium"
								rounded="xl"
								textTransform="uppercase"
								onClick={(e) => {
									e.preventDefault();
									onPurchase();
								}}
								_hover={{
									bg: "gray.700",
								}}
								_focus={{
									bg: "gray.700",
								}}>
								<AiOutlineShoppingCart />
							</Button>
						</HStack>
					)}
				</Box>
			</MotionStack>
			<ProductModal data={data} isOpen={isOpen} onClose={onClose} onPurchase={onPurchase} />
		</>
	);
}
