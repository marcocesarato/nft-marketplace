import {ReactNode, useState} from "react";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {IoArrowBackOutline, IoCloseOutline, IoCubeOutline} from "react-icons/io5";
import {SiOculus} from "react-icons/si";
import {SimpleGrid, Text} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {TokenItem} from "@app/types";
import Viewer3D from "@components/Viewer3D";
import ViewerAR from "@components/ViewerAR";
import useWebXR from "@hooks/useWebXR";

import ProductInfos from "./ProductInfos";
import ProductModeButton from "./ProductModeButton";

type ProductDetailsProps = {
	data: TokenItem;
	onClose?: () => void;
	onPurchase?: Function;
};

export default function Index({
	data,
	onClose = null,
	onPurchase = null,
}: ProductDetailsProps): JSX.Element {
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
			body = <ViewerAR image={data.image} onClose={resetMode} />;
			break;
		case "vr":
			body = <ViewerAR image={data.image} onClose={resetMode} />;
			break;
		case "3d":
			body = <Viewer3D data={data} />;
			break;
		default:
			body = <ProductInfos data={data} onPurchase={onPurchase} />;
	}

	return (
		<>
			{body}
			<SimpleGrid minChildWidth="120px" spacing="4" mt="6">
				{supportsARSession && isDetailMode && data?.image ? (
					<ProductModeButton onClick={setARMode}>
						<SiOculus /> <Text ml="4">AR</Text>
					</ProductModeButton>
				) : supportsVRSession && isDetailMode && data?.image ? (
					<ProductModeButton onClick={setVRMode}>
						<SiOculus /> <Text ml="4">VR</Text>
					</ProductModeButton>
				) : null}
				{isDetailMode && data?.image && (
					<ProductModeButton onClick={set3DMode}>
						<IoCubeOutline /> <Text ml="4">3D View</Text>
					</ProductModeButton>
				)}
			</SimpleGrid>
			<SimpleGrid minChildWidth="120px" spacing="4" my="4">
				{!isDetailMode ? (
					<ProductModeButton onClick={resetMode}>
						<IoArrowBackOutline />
						<Text ml="4">{t<string>("common:action.back")}</Text>
					</ProductModeButton>
				) : (
					onClose && (
						<ProductModeButton
							onClick={() => {
								onClose && onClose();
								resetMode();
							}}>
							<IoCloseOutline />
							<Text ml="4">{t<string>("common:action.close")}</Text>
						</ProductModeButton>
					)
				)}
				{onPurchase && (
					<ProductModeButton
						onClick={() => {
							onClose && onClose();
							onPurchase();
						}}>
						<AiOutlineShoppingCart />
						<Text ml="4">{t<string>("common:action.purchase")}</Text>
					</ProductModeButton>
				)}
			</SimpleGrid>
		</>
	);
}
