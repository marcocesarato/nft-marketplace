import {Button, Box, Flex, Text, useDisclosure} from "@chakra-ui/react";
import useAccount from "@hooks/useAccount";
import useBalance from "@hooks/useBalance";
import {useEffect} from "react";

import UserMenu from "./UserMenu";
import AuthModal from "../AuthModal";

export default function ConnectButton({openAccountModal}) {
	const {isAuthenticated, enableWeb3} = useAccount();
	const {data: balance} = useBalance();
	const {isOpen, onOpen, onClose} = useDisclosure();

	useEffect(() => {
		if (isAuthenticated) {
			enableWeb3();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	return (
		<>
			{isAuthenticated ? (
				<Flex alignItems="center" borderRadius="xl" py="0">
					<Box px="3">
						<Text fontSize="md" display={{base: "none", md: "block"}}>
							{balance?.formatted}
						</Text>
					</Box>
					<UserMenu openAccountModal={openAccountModal} />
				</Flex>
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
			)}
		</>
	);
}
