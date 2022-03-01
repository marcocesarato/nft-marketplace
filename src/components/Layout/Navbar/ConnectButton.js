import {useEffect} from "react";
import {Box, Button, Flex, Text, useDisclosure} from "@chakra-ui/react";

import useAccount from "@hooks/useAccount";
import useBalance from "@hooks/useBalance";
import useWeb3 from "@hooks/useWeb3";

import AuthModal from "../AuthModal";
import UserMenu from "./UserMenu";

export default function ConnectButton({openAccountModal}) {
	const {isAuthenticated} = useAccount();
	const {enableWeb3} = useWeb3();
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
						<Text
							fontSize="md"
							fontWeight="medium"
							display={{base: "none", md: "block"}}>
							{balance?.formatted}
						</Text>
					</Box>
					<UserMenu openAccountModal={openAccountModal} />
				</Flex>
			) : (
				<>
					<Button
						onClick={onOpen}
						fontSize="md"
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
