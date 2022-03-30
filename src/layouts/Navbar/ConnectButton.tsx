import {useEffect} from "react";
import {IoWalletOutline} from "react-icons/io5";
import {Button, Flex, Text, useDisclosure} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import useAccount from "@hooks/useAccount";
import useWeb3 from "@hooks/useWeb3";

import AuthModal from "../AuthModal";
import UserMenu from "./UserMenu";

export default function ConnectButton({openAccountModal}): JSX.Element {
	const {t} = useTranslation();
	const {isAuthenticated} = useAccount();
	const {enableWeb3} = useWeb3();
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
						<IoWalletOutline />
						<Text ml={2} d={{base: "none", md: "inline-block"}}>
							{t("common:action.connectToWallet")}
						</Text>
					</Button>
					<AuthModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
				</>
			)}
		</>
	);
}
