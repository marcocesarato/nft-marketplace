import {
	Box,
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	Text,
} from "@chakra-ui/react";
import {ExternalLinkIcon, CopyIcon} from "@chakra-ui/icons";
import Avatar from "@components/Avatar";
import {formatAddress} from "@app/utils/formatters";
import {getExplorer} from "@utils/networks";
import useAccount from "@hooks/useAccount";
import {useRouter} from "next/router";
import NextLink from "next/link";

import ActionButton from "./ActionButton";
import LinkButton from "./LinkButton";
import DisconnectButton from "./DisconnectButton";

export default function AccountModal({isOpen, onClose}) {
	const {account, logout, chainId, balance, balanceNativeName} = useAccount();
	const router = useRouter();

	function handleLogout() {
		logout();
		onClose();
		router.push("/");
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
			<ModalOverlay />
			<ModalContent background="gray.900">
				<ModalHeader color="white" p={4} fontSize="lg" fontWeight="medium">
					Account
				</ModalHeader>
				<ModalCloseButton
					color="white"
					fontSize="sm"
					_hover={{
						color: "whiteAlpha.700",
					}}
				/>
				<ModalBody>
					<Box
						borderRadius="md"
						border="1px"
						borderStyle="solid"
						borderColor="gray.600"
						p={5}>
						<Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
							<Avatar />
							<Text
								color="white"
								fontSize="xl"
								fontWeight="semibold"
								ml="2"
								lineHeight="1.1">
								{account && formatAddress(account)}
							</Text>
							<Text color="gray.400" ml="auto" fontSize="sm">
								{balance?.formatted} {balanceNativeName}
							</Text>
						</Flex>
						<Flex alignContent="center" my={3}>
							<LinkButton onClick={() => navigator.clipboard.writeText(account)}>
								<CopyIcon mr={1} />
								Copy Address
							</LinkButton>
							<LinkButton
								ml={6}
								href={`${getExplorer(chainId)}address/${account}`}
								isExternal>
								<ExternalLinkIcon mr={1} />
								View on Explorer
							</LinkButton>
						</Flex>
						<Flex alignItems="center" mt={6}>
							<NextLink href={"/transactions"} passHref>
								<ActionButton onClick={onClose}>View transactions</ActionButton>
							</NextLink>
						</Flex>
					</Box>
				</ModalBody>
				<ModalFooter pb={6}>
					<DisconnectButton onDisconnect={handleLogout} />
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
