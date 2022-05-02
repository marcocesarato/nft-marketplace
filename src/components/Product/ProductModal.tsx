import { ReactNode, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoArrowBackOutline, IoCloseOutline, IoCubeOutline } from "react-icons/io5";
import { SiOculus } from "react-icons/si";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

import ProductAR from "@components/ProductAR";
import useWebXR from "@hooks/useWebXR";

import Product3DViewer from "./Product3DViewer";
import ProductDetails from "./ProductDetails";
import ProductModalButton from "./ProductModalButton";

export default function ProductModal({ data, onClose, onPurchase, isOpen, ...props }): JSX.Element {
	const { t } = useTranslation();
	const { supportsVRSession, supportsARSession } = useWebXR();

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
				<ModalBody position="relative">
					{body}
					<SimpleGrid minChildWidth="120px" spacing="4" mt="6">
						{supportsARSession && isDetailMode && data?.image && (
							<ProductModalButton onClick={setARMode}>
								<SiOculus /> <Text ml="4">AR</Text>
							</ProductModalButton>
						)}
						{supportsVRSession && isDetailMode && data?.image && (
							<ProductModalButton onClick={setVRMode}>
								<SiOculus /> <Text ml="4">VR</Text>
							</ProductModalButton>
						)}
						{!supportsARSession && !supportsVRSession && isDetailMode && data?.image && (
							<ProductModalButton onClick={set3DMode}>
								<IoCubeOutline /> <Text ml="4">3D View</Text>
							</ProductModalButton>
						)}
					</SimpleGrid>
					<SimpleGrid minChildWidth="120px" spacing="4" my="4">
						{!isDetailMode ? (
							<ProductModalButton onClick={resetMode}>
								<IoArrowBackOutline />
								<Text ml="4">{t<string>("common:action.back")}</Text>
							</ProductModalButton>
						) : (
							<ProductModalButton onClick={handleClose}>
								<IoCloseOutline />
								<Text ml="4">{t<string>("common:action.close")}</Text>
							</ProductModalButton>
						)}
						{onPurchase && (
							<ProductModalButton
								onClick={() => {
									onClose();
									onPurchase();
								}}>
								<AiOutlineShoppingCart />
								<Text ml="4">{t<string>("common:action.purchase")}</Text>
							</ProductModalButton>
						)}
					</SimpleGrid>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
