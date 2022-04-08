import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Image from "next/image";
import {Box, Button, CloseButton, Flex, Text} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {createBrowserHistory} from "history";
import {useTranslation} from "next-i18next";

import stabilizationIcon from "@assets/images/stabilization.gif";

import ARController from "./ARController";

export const MotionBox = motion(Box); // Animated box

export default function ProductAR({image, onClose}): JSX.Element {
	const {t} = useTranslation();
	const [init, setInit] = useState(false);
	const [showTip, setShowTip] = useState(true);
	const [isSupported, setSupported] = useState(null);
	const [buttonText, setButtonText] = useState(null);
	const [controller, setController] = useState(null);
	const refOverlay = useRef(null);
	const history = useMemo(() => createBrowserHistory(), []); // Browser history

	const handleOnClose = useCallback(() => {
		setSupported(false);
		controller.close();
		onClose && onClose();
	}, [controller, setSupported, onClose]);

	useEffect(() => {
		return history.listen((location) => {
			if (location.action === "POP") {
				handleOnClose(); // Close XR on back button
			}
		});
	}, [handleOnClose, history]);

	useEffect(() => {
		if (!init && refOverlay?.current) {
			const app = new ARController(refOverlay?.current);
			setController(app);
			setInit(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [init, refOverlay?.current]);

	useEffect(() => {
		if (controller && !isSupported) {
			controller.checkIsSupported((result) => {
				setSupported(result);
				if (result) {
					controller.init();
					controller.open();
					controller.setPicture(image);
				}
			});
			controller.onToggle((insideXR) => {
				if (insideXR === false) setButtonText(null);
			});
			controller.onFirstReticle(() => {
				setShowTip(false);
			});
			controller.onPicturePlaced(() => {
				setButtonText("Reposition panel");
			});
			controller.onPictureRemoved(() => {
				setButtonText(null);
			});
		}
	}, [controller, isSupported, image, handleOnClose]);

	const onResetClick = () => {
		controller.removePicture();
	};

	return (
		<Flex ref={refOverlay} position="relative" height="50vh">
			<Flex
				position="absolute"
				width="100%"
				height="100%"
				top="0"
				left="0"
				bg={!isSupported ? "gray.900" : null}
				borderRadius="lg"
				flex={1}
				flexDirection="column"
				alignItems="center"
				justifyContent="center">
				{isSupported && (
					<CloseButton
						color="gray.100"
						position="absolute"
						top={5}
						right={5}
						onClick={handleOnClose}
					/>
				)}
				{isSupported === false && (
					<Text color="gray.100" textAlign="center" p={4}>
						{t<string>("common:xr.notSupported")}
					</Text>
				)}
				{isSupported && showTip && (
					<>
						<MotionBox
							mt="-100px"
							initial={{translateX: 0}}
							animate={{translateX: [0, -30, 0, 30, 0]}}
							transition={{
								duration: 8,
								ease: "easeInOut",
								times: [0, 0.2, 0.5, 0.8, 1],
								loop: Infinity,
								repeatDelay: 1,
							}}>
							<Image
								src={stabilizationIcon}
								alt="stabilization"
								height="380"
								width="380"
							/>
						</MotionBox>
						<Text color="gray.100" mt="-125px" p={4} textAlign="center">
							{t<string>("common:xr.stabilizationTip")}
						</Text>
					</>
				)}
				{isSupported && buttonText && (
					<Button
						colorScheme="whiteAlpha"
						color="gray.100"
						position="absolute"
						size="lg"
						bottom={5}
						onClick={onResetClick}>
						{buttonText}
					</Button>
				)}
			</Flex>
		</Flex>
	);
}
