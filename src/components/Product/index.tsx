import {AiOutlineShoppingCart} from "react-icons/ai";
import {
	Box,
	Button,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
	useBreakpointValue,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";

import {useConfig} from "@contexts/Global";

import ProductModal from "./ProductModal";

export default function Product({data, onPurchase = null, ...rootProps}): JSX.Element {
	const {nativeToken} = useConfig();
	const {isOpen, onOpen, onClose} = useDisclosure();
	return (
		<>
			<Stack
				pt={12}
				spacing={useBreakpointValue({base: "4", md: "5"})}
				cursor="pointer"
				onClick={onOpen}
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
						height={"230px"}
						_after={{
							transition: "all .3s ease",
							content: '""',
							w: "full",
							h: "full",
							pos: "absolute",
							top: 2,
							left: 0,
							background: `url(${data?.image}) #333`,
							filter: `blur(15px) brightness(${useColorModeValue("80%", "50%")})`,
							zIndex: -1,
						}}
						_groupHover={{
							_after: {
								filter: "blur(25px)",
							},
						}}>
						<Image
							rounded={"lg"}
							height={230}
							width="100%"
							objectFit={"cover"}
							boxShadow={"md"}
							alt={data?.name}
							src={data?.image}
							fallbackSrc="https://via.placeholder.com/150/000000/000000/?text="
						/>
					</Box>
					<Stack p={6} pt={10} align={"center"}>
						<Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
							Item
						</Text>
						<Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
							{data?.name}
						</Heading>
					</Stack>
					{onPurchase && (
						<Box
							opacity={0.8}
							alignItems="center"
							justifyContent="space-between"
							p={4}
							roundedBottom="lg">
							{data?.price && (
								<Stack direction={"row"} align={"center"}>
									<Text fontWeight="medium" fontSize={"lg"}>
										{data?.price} {nativeToken?.symbol}
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
								onClick={onPurchase}
								_hover={{
									bg: "gray.700",
								}}
								_focus={{
									bg: "gray.700",
								}}>
								<AiOutlineShoppingCart />
							</Button>
						</Box>
					)}
				</Box>
			</Stack>
			<ProductModal data={data} isOpen={isOpen} onClose={onClose} onPurchase={onPurchase} />
		</>
	);
}
