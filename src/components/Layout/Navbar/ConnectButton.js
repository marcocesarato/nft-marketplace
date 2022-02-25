import {Button, Box, Text, useDisclosure} from "@chakra-ui/react";
import {formatAddress} from "@app/utils/formatters";
import useAccount from "@hooks/useAccount";
import useBalance from "@hooks/useBalance";
import {useEffect} from "react";

import Avatar from "@components/Avatar";

import AuthModal from "./AuthModal";

export default function ConnectButton({handleOpenModal}) {
	const {isAuthenticated, account, enableWeb3} = useAccount();
	const {data: balance} = useBalance();
	const {isOpen, onOpen, onClose} = useDisclosure();

	useEffect(() => {
		if (isAuthenticated) {
			enableWeb3();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return isAuthenticated ? (
		<Box display="flex" alignItems="center" borderRadius="xl" py="0">
			<Box px="3">
				<Text fontSize="md" display={{base: "none", md: "block"}}>
					{balance?.formatted}
				</Text>
			</Box>
			<Button onClick={handleOpenModal} borderRadius="xl" m="1px" px={3} height="38px">
				<Text fontSize="md" fontWeight="medium" mr="2">
					{formatAddress(account)}
				</Text>
				<Avatar />
			</Button>
		</Box>
	) : (
		<>
			<Button
				onClick={onOpen}
				fontSize="lg"
				fontWeight="medium"
				borderRadius="xl"
				border="1px solid transparent">
				Connect to a wallet
			</Button>
			<AuthModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
		</>
	);
}
