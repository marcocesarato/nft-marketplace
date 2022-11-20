import {MouseEvent, useState} from "react";
import {
	AiFillHeart,
	AiFillStar,
	AiOutlineBlock,
	AiOutlineHeart,
	AiOutlineShoppingCart,
	AiOutlineStar,
} from "react-icons/ai";
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

import {TokenItem} from "@app/types";
import Address from "@components/Address";
import ProductModal from "@components/Product/ProductModal";
import {useConfig} from "@contexts/Global";
import useIPFS from "@hooks/useIPFS";
import {
	useAddToFavouritesMutation,
	useDislikeMutation,
	useLikeMutation,
	useRemoveFromFavouritesMutation,
} from "@services/graphql";

export type ProductProps = {
	data: TokenItem;
	onPurchase?: (e?: MouseEvent) => void;
	[key: string]: any;
};

const MotionStack = motion(Stack);
export default function Product({
	data,
	onPurchase = null,
	...rootProps
}: ProductProps): JSX.Element {
	const {t} = useTranslation();
	const {symbol} = useConfig();
	const {resolveLink} = useIPFS();
	const [likes, setLikes] = useState(data?.likes || 0);
	const [isLiked, setIsLiked] = useState(data?.is_liked || false);
	const [isFavourited, setIsFavourited] = useState(data?.is_favourited || false);
	const {isOpen, onOpen, onClose} = useDisclosure();
	const bg = useColorModeValue("gray.200", "gray.900");
	const bgButton = useColorModeValue("gray.700", "white");
	const blur = useColorModeValue("80%", "50%");

	const [addToFavourite] = useAddToFavouritesMutation({
		variables: {
			token_id: data?.token_id,
		},
	});

	const [removeFromFavourite] = useRemoveFromFavouritesMutation({
		variables: {
			token_id: data?.token_id,
		},
	});

	const [like] = useLikeMutation({
		variables: {
			token_id: data?.token_id,
		},
	});

	const [dislike] = useDislikeMutation({
		variables: {
			token_id: data?.token_id,
		},
	});

	const handleLike = async () => {
		if (isLiked) {
			await dislike();
			setLikes(likes - 1);
			setIsLiked(false);
		} else {
			await like();
			setLikes(likes + 1);
			setIsLiked(true);
		}
	};

	const handleFavourite = async () => {
		if (isFavourited) {
			await removeFromFavourite();
			setIsFavourited(false);
		} else {
			await addToFavourite();
			setIsFavourited(true);
		}
	};

	return (
		<>
			<MotionStack
				mt={12}
				spacing={useBreakpointValue({base: "4", md: "5"})}
				zIndex={0}
				{...rootProps}>
				<Box
					role={"group"}
					w={"full"}
					transition="all .5s ease"
					bg={bg}
					rounded={"lg"}
					pos={"relative"}
					zIndex={1}
					shadow="sm"
					_hover={{
						shadow: "md",
					}}>
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
							background: `url(${resolveLink(data?.thumbnail || data?.image)}) #333`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							transform: "rotate(0)",
							filter: `blur(15px) brightness(${blur})`,
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
							background={`url(${resolveLink(data?.thumbnail || data?.image)}) #333`}
							backgroundSize="cover"
							backgroundPosition="center"
							_hover={{
								transform: "scale(1.1)",
							}}
						/>
					</Box>
					<Stack p={6} pt={8} align={"center"}>
						<Heading
							fontSize={"2xl"}
							fontFamily={"body"}
							fontWeight={500}
							cursor="pointer"
							onClick={onOpen}>
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
					</Stack>
					<HStack px={4} justifyContent="center" w="full">
						<Box
							transition="all .3s ease"
							color={isLiked ? "red.500" : bgButton}
							cursor="pointer"
							onClick={handleLike}
							_hover={{
								transform: "scale(1.4)",
							}}
							display={data?._id ? "block" : "none"}>
							{isLiked ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
						</Box>
						<Text
							fontWeight="medium"
							fontSize={"lg"}
							display={data?._id ? "block" : "none"}>
							{likes}
						</Text>
						<Box
							transition="all .3s ease"
							color={isFavourited ? "yellow.500" : bgButton}
							cursor="pointer"
							onClick={handleFavourite}
							_hover={{
								transform: "scale(1.4)",
							}}
							display={data?._id ? "block" : "none"}>
							{isFavourited ? <AiFillStar size={24} /> : <AiOutlineStar size={24} />}
						</Box>
						<Box
							transition="all .3s ease"
							color={bgButton}
							cursor="pointer"
							onClick={onOpen}
							_hover={{
								transform: "scale(1.4)",
							}}
							display={data?._id ? "none" : "block"}>
							<AiOutlineBlock size={24} />
						</Box>
					</HStack>
					{onPurchase && data?.price && (
						<HStack
							opacity={0.8}
							alignItems="center"
							justifyContent="space-between"
							p={4}
							pb={0}
							roundedBottom="lg">
							{data?.price && (
								<Stack direction={"row"} align={"center"}>
									<Text fontWeight="medium" fontSize={"md"}>
										{data?.price_formatted || data?.price} {symbol}
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
								onClick={(e: MouseEvent) => {
									e.preventDefault();
									onPurchase(e);
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
					<Box height={6} />
				</Box>
			</MotionStack>
			<ProductModal data={data} isOpen={isOpen} onClose={onClose} onPurchase={onPurchase} />
		</>
	);
}
