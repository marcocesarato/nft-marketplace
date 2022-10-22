import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";

import ProductDetails from "./ProductDetails";

export default function ProductModal({data, isOpen, onPurchase, onClose, ...props}): JSX.Element {
	return (
		<Modal size="6xl" onClose={onClose} isOpen={isOpen} {...props}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader />
				<ModalCloseButton />
				<ModalBody position="relative">
					<ProductDetails data={data} onPurchase={onPurchase} onClose={onClose} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
