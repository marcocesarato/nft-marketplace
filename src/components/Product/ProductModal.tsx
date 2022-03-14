import {ReactNode, useState} from "react";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import ProductAR from "@components/ProductAR";
import useWebXR from "@hooks/useWebXR";

import Product3DViewer from "./Product3DViewer";
import ProductDetails from "./ProductDetails";
import ProductModalButton from "./ProductModalButton";

export default function ProductModal({data, onClose, onPurchase, isOpen, ...props}): JSX.Element {
	const {t} = useTranslation();
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
						<ProductModalButton onClick={setARMode}>
							{t("common:action.openWith")} AR
						</ProductModalButton>
					)}
					{supportsVRSession && isDetailMode && (
						<ProductModalButton onClick={setVRMode}>
							{t("common:action.openWith")} VR
						</ProductModalButton>
					)}
					{!supportsARSession && !supportsVRSession && isDetailMode && (
						<ProductModalButton onClick={set3DMode}>
							{t("common:action.openWith")} 3D View
						</ProductModalButton>
					)}
					{!isDetailMode && (
						<ProductModalButton onClick={resetMode}>
							{t("common:action.back")}
						</ProductModalButton>
					)}
					{onPurchase && (
						<ProductModalButton
							onClick={() => {
								onClose();
								onPurchase();
							}}>
							<AiOutlineShoppingCart />{" "}
							<Text ml="4">{t("common:action.purchase")}</Text>
						</ProductModalButton>
					)}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
