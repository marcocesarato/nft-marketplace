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

import ProductXR from "@components/ProductXR";

import ProductDetails from "./ProductDetails";

export default function ProductModal({data, onClose, onPurchase, isOpen, ...props}): JSX.Element {
	const {isOpen: isOpenVR, onOpen: onOpenVR, onClose: onCloseVR} = useDisclosure();
	const handleClose = () => {
		onClose();
		onCloseVR();
	};
	return (
		<Modal size="6xl" onClose={handleClose} isOpen={isOpen} {...props}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader />
				<ModalCloseButton />
				<ModalBody position="relative">
					{!isOpenVR ? (
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
						<ProductXR image={data.image} onClose={onCloseVR} />
					)}
				</ModalBody>
				<ModalFooter>
					<Button
						w={"full"}
						size={"lg"}
						py={"7"}
						mr={2}
						textTransform={"uppercase"}
						onClick={isOpenVR ? onCloseVR : onOpenVR}>
						{isOpenVR ? "Close VR" : "Open VR"}
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
