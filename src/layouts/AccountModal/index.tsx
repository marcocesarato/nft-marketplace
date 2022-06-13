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
import {useTranslation} from "next-i18next";

import Avatar from "@components/Avatar";
import useGlobalContext from "@contexts/Global";
import ErrorAlert from "@errors/ErrorAlert";
import useAccount from "@hooks/useAccount";
import useBalance from "@hooks/useBalance";
import useDebounceCallback from "@hooks/useDebounceCallback";
import useUser from "@hooks/useUser";
import {useUserUpdateMutation} from "@services/graphql";
import {formatAddress} from "@utils/formatters";
import {getExplorer} from "@utils/networks";

import ActionButton from "./ActionButton";
import DisconnectButton from "./DisconnectButton";
import LinkButton from "./LinkButton";

export default function AccountModal({isOpen, onClose}): JSX.Element {
	const {t} = useTranslation();
	const {account, logout, chainId, userError} = useAccount();
	const {id, username} = useUser();
	const {data: balance} = useBalance();
	const router = useRouter();
	const [userUpdate] = useUserUpdateMutation();
	const {setConfig} = useGlobalContext();

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
		userUpdate({
			variables: {
				id,
				record: {username: event.target.value},
			},
		});
		setConfig({username: event.target.value});
	}

	const changeUsername = useDebounceCallback(handleChangeUsername.bind(this), 500);

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
			<ModalOverlay />
			<ModalContent background="gray.900">
				<ModalHeader color="white" p={4} fontSize="lg" fontWeight="medium">
					{t<string>("common:account.title")}
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
						<ErrorAlert
							error={t<string>("error:account.errorSavingData")}
							message={userError.message}
						/>
					)}
					<Box
						borderRadius="md"
						border="1px"
						borderStyle="solid"
						borderColor="gray.600"
						p={5}>
						<Flex alignItems="center" mb={4} lineHeight={1}>
							<Avatar address={account} />
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
								{t<string>("common:action.copyAddress")}
							</LinkButton>
							<LinkButton
								ml={6}
								href={`${getExplorer(chainId)}address/${account}`}
								isExternal>
								<ExternalLinkIcon mr={1} />
								{t<string>("common:action.viewOnExplorer")}
							</LinkButton>
						</Flex>
						<Flex justifyContent={"flex-end"} mt={6}>
							<ActionButton onClick={handleBuyCrypto}>Buy crypto</ActionButton>
							<ActionButton onClick={handleViewTransactions}>
								{t<string>("common:action.viewTransactions")}
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
