import {MouseEvent} from "react";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";

import {TokenItem} from "@app/types";
import Product from "@components/Product";

export type ProductModalProps = {
	data: TokenItem;
	isOpen: boolean;
	onPurchase?: (e?: MouseEvent) => void;
	onClose?: () => void;
	[key: string]: any;
};

export default function ProductModal({
	data,
	isOpen,
	onPurchase,
	onClose,
	...props
}: ProductModalProps): JSX.Element {
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
