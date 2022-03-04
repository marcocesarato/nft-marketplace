import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Image from "next/image";
import {Box, Button, CloseButton, Flex, Text} from "@chakra-ui/react";
import {motion} from "framer-motion";
import {createBrowserHistory} from "history";

import stabilizationIcon from "@assets/images/stabilization.gif";

import Controller from "./Controller";

export const MotionBox = motion(Box); // Animated box

export default function ProductAR({image, onClose}) {
	const [showTip, setShowTip] = useState(true);
	const [isArWorking, setIsArWorking] = useState(null);
	const [init, setInit] = useState(null);
	const [buttonText, setButtonText] = useState(null);
	const [controller, setController] = useState(null);
	const refOverlay = useRef(null);
	const history = useMemo(() => createBrowserHistory(), []); // Browser history

	const handleOnClose = useCallback(() => {
		setIsArWorking(false);
		controller.closeXR();
		onClose && onClose();
	}, [controller, setIsArWorking, onClose]);

	useEffect(() => {
		return history.listen((location) => {
			if (location.action === "POP") {
				handleOnClose(); // Close XR on back button
			}
		});
	}, [handleOnClose, history]);

	useEffect(() => {
		if (!init && refOverlay?.current) {
			const app = new Controller(refOverlay?.current);
			setController(app);
			setInit(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [init, refOverlay?.current]);

	useEffect(() => {
		if (controller && !isArWorking) {
			controller.isArWorking((ok) => {
				setIsArWorking(ok);
				controller.openXR(refOverlay.current);
				controller.setPicture(image);
			});
			controller.setOpenCloseCallback((insideXR) => {
				if (insideXR === false) setButtonText(null);
			});
			controller.setOnFirstReticleCallback(() => {
				setShowTip(false);
			});
			controller.setPicturePlaceCallback(() => {
				setButtonText("Reposition panel");
			});
			controller.setPictureRemoveCallback(() => {
				setButtonText(null);
			});
		}
	}, [controller, isArWorking, image, handleOnClose]);

	const onResetClick = () => {
		controller.removePicture();
	};

	return (
		<Flex ref={refOverlay} position="relative" height="50vh">
			<Flex
				bg={!isArWorking ? "gray.900" : null}
				borderRadius="lg"
				flex={1}
				flexDirection="column"
				alignItems="center"
				justifyContent="center">
				{isArWorking && (
					<CloseButton
						color="gray.100"
						position="absolute"
						top={5}
						right={5}
						onClick={handleOnClose}
					/>
				)}
				{isArWorking === false && (
					<Text color="gray.100">
						Your current browser does not support required technology.
					</Text>
				)}
				{isArWorking && showTip && (
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
							Move your smartphone slightly around
							<br />
							to scan the ambient arount you
						</Text>
					</>
				)}
				{isArWorking && buttonText && (
					<Button
						colorScheme="whiteAlpha"
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
