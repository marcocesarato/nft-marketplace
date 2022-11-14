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
import {useNetwork} from "wagmi";

import Avatar from "@components/Avatar";
import {useConfig} from "@contexts/Global";
import useAccount from "@hooks/useAccount";
import useBalance from "@hooks/useBalance";
import useDebounceCallback from "@hooks/useDebounceCallback";
import useUser from "@hooks/useUser";
import {useUserUpdateMutation} from "@services/graphql";
import {formatAddress} from "@utils/formatters";

import ActionButton from "./ActionButton";
import LinkButton from "./LinkButton";

//import {signOut} from "next-auth/react";
//import DisconnectButton from "./DisconnectButton";

export default function AccountModal({isOpen, onClose}): JSX.Element {
	const {t} = useTranslation();
	const {address} = useAccount();
	const {chain} = useNetwork();
	const {id, username} = useUser();
	const {display: balance} = useBalance();
	const router = useRouter();
	const [userUpdate] = useUserUpdateMutation();
	const {setConfig} = useConfig();

	/*function handleLogout() {
		signOut();
		onClose();
		router.push("/");
	}*/

	function handleViewTransfers() {
		onClose();
		router.push("/transfers");
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
					{t<string>("common:account.profile")}
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
						<Flex alignItems="center" mb={4} lineHeight={1}>
							<Avatar address={address} />
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
								{address && formatAddress(address, 15)}
							</Text>
							<Text color="gray.400" ml="auto" fontSize="sm">
								{balance}
							</Text>
						</Flex>
						<Flex alignContent="center" my={3}>
							<LinkButton onClick={() => navigator.clipboard.writeText(address)}>
								<CopyIcon mr={1} />
								{t<string>("common:action.copyAddress")}
							</LinkButton>
							<LinkButton
								ml={6}
								href={`${chain?.blockExplorers?.default.url}address/${address}`}
								isExternal>
								<ExternalLinkIcon mr={1} />
								{t<string>("common:action.viewOnExplorer")}
							</LinkButton>
						</Flex>
						<Flex justifyContent={"flex-end"} mt={6}>
							<ActionButton onClick={handleBuyCrypto}>Buy crypto</ActionButton>
							<ActionButton onClick={handleViewTransfers}>
								{t<string>("common:action.viewTransfers")}
							</ActionButton>
						</Flex>
					</Box>
				</ModalBody>
				<ModalFooter pb={6}>
					{/*<DisconnectButton onDisconnect={handleLogout} />*/}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
