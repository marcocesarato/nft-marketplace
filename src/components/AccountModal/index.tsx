import {useRouter} from "next/router";
import {CopyIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {
	Box,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";

import {formatAddress} from "@app/utils/formatters";
import Avatar from "@components/Avatar";
import ErrorAlert from "@errors/ErrorAlert";
import useAccount from "@hooks/useAccount";
import useBalance from "@hooks/useBalance";
import useDebounce from "@hooks/useDebounce";
import {getExplorer} from "@utils/networks";

import ActionButton from "./ActionButton";
import DisconnectButton from "./DisconnectButton";
import LinkButton from "./LinkButton";

export default function AccountModal({isOpen, onClose}): JSX.Element {
	const {account, username, logout, chainId, setUserData, userError} = useAccount();
	const {data: balance} = useBalance();
	const router = useRouter();

	function handleLogout() {
		logout();
		onClose();
		router.push("/");
	}

	function handleViewTransactions() {
		onClose();
		router.push("/transactions");
	}

	function handleBuyCrypto() {
		onClose();
		router.push("/crypto");
	}

	function handleChangeUsername(event) {
		setUserData({username: event.target.value});
	}

	const changeUsername = useDebounce(handleChangeUsername.bind(this), 500);

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
					{userError && (
						<ErrorAlert error={"Update user data error!"} message={userError.message} />
					)}
					<Box
						borderRadius="md"
						border="1px"
						borderStyle="solid"
						borderColor="gray.600"
						p={5}>
						<Flex alignItems="center" mb={4} lineHeight={1}>
							<Avatar />
							<Editable
								color="white"
								fontSize="2xl"
								fontWeight="semibold"
								ml="4"
								lineHeight="1.1"
								defaultValue={username}>
								<EditablePreview />
								<EditableInput onChange={changeUsername} />
							</Editable>
						</Flex>
						<Flex alignItems="center" mb={4} lineHeight={1}>
							<Text color="gray.400" fontSize="sm" textAlign="right" lineHeight="1.1">
								{account && formatAddress(account, 15)}
							</Text>
							<Text color="gray.400" ml="auto" fontSize="sm">
								{balance?.formatted}
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
						<Flex justifyContent={"flex-end"} mt={6}>
							<ActionButton onClick={handleBuyCrypto}>Buy crypto</ActionButton>
							<ActionButton onClick={handleViewTransactions}>
								View transactions
							</ActionButton>
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
