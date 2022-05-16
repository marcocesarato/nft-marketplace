import {IoWalletOutline} from "react-icons/io5";
import {Button, Flex, Text, useDisclosure} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import useAccount from "@hooks/useAccount";

import AuthModal from "../AuthModal";
import UserMenu from "./UserMenu";

export default function ConnectButton({openAccountModal}): JSX.Element {
	const {t} = useTranslation();
	const {isAuthenticated} = useAccount();
	const {isOpen, onOpen, onClose} = useDisclosure();
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
						<Text ml={2} display={{base: "none", md: "inline-block"}}>
							{t<string>("common:action.connectToWallet")}
						</Text>
					</Button>
					<AuthModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
				</>
			)}
		</>
	);
}
