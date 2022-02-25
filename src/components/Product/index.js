import {
	Box,
	useBreakpointValue,
	useColorModeValue,
	Heading,
	Text,
	Stack,
	Image,
	Button,
	Flex,
} from "@chakra-ui/react";
import {useConfig} from "@contexts/Global";

export default function Product({data, onBuy, rootProps}) {
	const {nativeToken} = useConfig();
	return (
		<Stack pt={12} spacing={useBreakpointValue({base: "4", md: "5"})} {...rootProps}>
			<Box
				role={"group"}
				maxW={"330px"}
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
						width={282}
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
				<Flex
					opacity={0.8}
					alignItems="center"
					justifyContent="space-between"
					p={4}
					bg={useColorModeValue("gray.300", "gray.900")}
					roundedBottom="lg">
					{data?.price && (
						<Stack direction={"row"} align={"center"}>
							<Text fontWeight={800} fontSize={"lg"}>
								{data?.price} {nativeToken?.symbol}
							</Text>
						</Stack>
					)}
					{onBuy && (
						<Button
							px={2}
							py={1}
							bg="gray.600"
							fontSize="xs"
							color="gray.100"
							fontWeight="bold"
							rounded="lg"
							textTransform="uppercase"
							onClick={onBuy}
							_hover={{
								bg: "gray.700",
							}}
							_focus={{
								bg: "gray.700",
							}}>
							Purchase
						</Button>
					)}
				</Flex>
			</Box>
		</Stack>
	);
}
