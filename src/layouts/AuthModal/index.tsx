import {useEffect} from "react";
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import useAccount from "@hooks/useAccount";

import WalletConnect from "./WalletConnect";

export default function AuthModal({onClose, isOpen, ...props}): JSX.Element {
	const {t} = useTranslation();
	const {authError, user, account} = useAccount();

	useEffect(() => {
		if (user && account && onClose) {
			onClose();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<Modal {...props} isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{t("common:action.connectWallet")}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{authError && (
						<Alert status="error" mb={5}>
							<AlertIcon />
							<Box flex="1">
								<AlertTitle>{t("error:auth.failed")}</AlertTitle>
								<AlertDescription display="block">
									{authError.message}
								</AlertDescription>
							</Box>
						</Alert>
					)}
					<WalletConnect />
				</ModalBody>
				<ModalFooter />
			</ModalContent>
		</Modal>
	);
}
