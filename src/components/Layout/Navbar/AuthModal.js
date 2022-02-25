import {
	Button,
	Alert,
	AlertIcon,
	Box,
	AlertTitle,
	AlertDescription,
	CloseButton,
	Modal,
	ModalHeader,
	ModalBody,
	ModalContent,
	ModalCloseButton,
	ModalFooter,
	ModalOverlay,
} from "@chakra-ui/react";
import useAccount from "@hooks/useAccount";
import {useState, useEffect} from "react";

import Login from "./Login";
import SignUp from "./SignUp";
import WalletConnect from "./WalletConnect";

export default function AuthModal({onClose, ...props}) {
	const {isAuthenticating, authError, user, account} = useAccount();
	const [method, setMethod] = useState(null);

	const onModalClose = () => {
		setMethod(null);
		onClose();
	};

	useEffect(() => {
		if (user && account) {
			onModalClose();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	let AuthComponent;
	let title;
	switch (method) {
		case "login":
			AuthComponent = Login;
			title = "Login";
			break;
		case "signup":
			AuthComponent = SignUp;
			title = "Sign Up";
			break;
		default:
			AuthComponent = null;
			title = user ? "Connect wallet" : "Authenticate";
	}

	return (
		<Modal {...props} onClose={onModalClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{authError && (
						<Alert status="error" mb={5}>
							<AlertIcon />
							<Box flex="1">
								<AlertTitle>Authentication has failed!</AlertTitle>
								<AlertDescription display="block">
									{authError.message}
								</AlertDescription>
							</Box>
						</Alert>
					)}
					{method ? (
						<AuthComponent
							onSuccess={() => {
								setMethod(null);
							}}
						/>
					) : (
						<>
							{!user && (
								<>
									<Button
										isLoading={isAuthenticating}
										onClick={() => setMethod("login")}
										isFullWidth
										mb={2}>
										Login
									</Button>
									<Button
										isLoading={isAuthenticating}
										onClick={() => setMethod("signup")}
										isFullWidth
										mb={2}>
										Sign Up
									</Button>
								</>
							)}
							<WalletConnect />
						</>
					)}
				</ModalBody>
				<ModalFooter />
			</ModalContent>
		</Modal>
	);
}
