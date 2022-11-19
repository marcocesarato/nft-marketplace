import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";

import Product from "@components/Product";

export default function ProductModal({data, isOpen, onPurchase, onClose, ...props}): JSX.Element {
	return (
		<Modal size="6xl" onClose={onClose} isOpen={isOpen} {...props}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader />
				<ModalCloseButton />
				<ModalBody position="relative">
					<Product data={data} onPurchase={onPurchase} onClose={onClose} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
