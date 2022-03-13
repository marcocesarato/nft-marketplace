import {ReactNode, useState} from "react";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";

import useWebXR from "@app/hooks/useWebXR";
import ProductAR from "@components/ProductAR";

import Product3DViewer from "./Product3DViewer";
import ProductDetails from "./ProductDetails";
import ProductModalButton from "./ProductModalButton";

export default function ProductModal({data, onClose, onPurchase, isOpen, ...props}): JSX.Element {
	const {supportsVRSession, supportsARSession} = useWebXR();

	const [mode, setMode] = useState(null);
	const resetMode = () => setMode(null);

	const setARMode = () => setMode("ar");
	const setVRMode = () => setMode("vr");
	const set3DMode = () => setMode("3d");

	const isARMode = mode === "ar";
	const isVRMode = mode === "vr";
	const is3DMode = mode === "3d";

	const isDetailMode = !isARMode && !isVRMode && !is3DMode;

	let body: ReactNode;
	switch (mode) {
		case "ar":
			body = <ProductAR image={data.image} onClose={resetMode} />;
			break;
		case "vr":
			body = <ProductAR image={data.image} onClose={resetMode} />;
			break;
		case "3d":
			body = <Product3DViewer data={data} />;
			break;
		default:
			body = <ProductDetails data={data} onPurchase={onPurchase} />;
	}

	const handleClose = () => {
		onClose();
		resetMode();
	};

	return (
		<Modal size="6xl" onClose={handleClose} isOpen={isOpen} {...props}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader />
				<ModalCloseButton />
				<ModalBody position="relative">{body}</ModalBody>
				<ModalFooter mx={-2}>
					{supportsARSession && isDetailMode && (
						<ProductModalButton onClick={setARMode}>Open with AR</ProductModalButton>
					)}
					{supportsVRSession && isDetailMode && (
						<ProductModalButton onClick={setVRMode}>Open with VR</ProductModalButton>
					)}
					{!supportsARSession && !supportsVRSession && isDetailMode && (
						<ProductModalButton onClick={set3DMode}>Open 3D View</ProductModalButton>
					)}
					{!isDetailMode && (
						<ProductModalButton onClick={resetMode}>Back</ProductModalButton>
					)}
					{onPurchase && (
						<ProductModalButton
							onClick={() => {
								onClose();
								onPurchase();
							}}>
							<AiOutlineShoppingCart /> <Text ml="4">Purchase</Text>
						</ProductModalButton>
					)}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
