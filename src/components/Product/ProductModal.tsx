import {
	Button,
	//Box,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";

import ProductAR from "@components/ProductAR";

import ProductDetails from "./ProductDetails";

export default function ProductModal({data, onClose, onPurchase, isOpen, ...props}): JSX.Element {
	const {isOpen: isOpenAR, onOpen: onOpenAR, onClose: onCloseAR} = useDisclosure();
	const handleClose = () => {
		onClose();
		onCloseAR();
	};
	return (
		<Modal size="6xl" onClose={handleClose} isOpen={isOpen} {...props}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader />
				<ModalCloseButton />
				<ModalBody position="relative">
					{!isOpenAR ? (
						<ProductDetails data={data} onPurchase={onPurchase} />
					) : (
						/*(<Box
							as="iframe"
							title="product-details"
							src={`${process.env.APP_VR_URL}?img=${encodeURIComponent(data.image)}`}
							width="100%"
							minH="70vh"
							mt={2}
							borderRadius={"xl"}
							frameBorder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>)*/
						<ProductAR image={data.image} onClose={onCloseAR} />
					)}
				</ModalBody>
				<ModalFooter>
					<Button
						w={"full"}
						size={"lg"}
						py={"7"}
						mr={2}
						textTransform={"uppercase"}
						onClick={isOpenAR ? onCloseAR : onOpenAR}>
						{isOpenAR ? "Close AR" : "Open AR"}
					</Button>
					{onPurchase && (
						<Button
							w={"full"}
							size={"lg"}
							py={"7"}
							textTransform={"uppercase"}
							onClick={() => {
								onClose();
								onPurchase();
							}}>
							Purchase
						</Button>
					)}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
