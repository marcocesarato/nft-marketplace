import {
	Box,
	Button,
	Flex,
	Link,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
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

export default function AccountModal({isOpen, onClose}) {
	const {account, logout, chainId, balance, balanceNativeName} = useAccount();
	const router = useRouter();

	function handleDeactivateAccount() {
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
				<ModalBody pt={0} p={4}>
					<Box
						borderRadius="3xl"
						border="1px"
						borderStyle="solid"
						borderColor="gray.600"
						px={5}
						pt={4}
						pb={2}
						mb={3}>
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
						<Flex alignContent="center" m={3}>
							<Button
								variant="link"
								color="gray.400"
								fontWeight="normal"
								fontSize="sm"
								_hover={{
									textDecoration: "none",
									color: "whiteAlpha.800",
								}}>
								<CopyIcon mr={1} />
								Copy Address
							</Button>
							<Link
								fontSize="sm"
								display="flex"
								alignItems="center"
								href={`${getExplorer(chainId)}address/${account}`}
								isExternal
								color="gray.400"
								ml={6}
								_hover={{
									color: "whiteAlpha.800",
									textDecoration: "none",
								}}>
								<ExternalLinkIcon mr={1} />
								View on Explorer
							</Link>
						</Flex>
						<Flex alignItems="center" mt={6} mb={3}>
							<NextLink href={"/transactions"} passHref>
								<Button
									variant="outline"
									size="sm"
									borderRadius="3xl"
									fontSize="13px"
									fontWeight="normal"
									color="gray.400"
									borderColor="gray.400"
									ml="auto"
									px={2}
									height="26px"
									_hover={{
										background: "none",
										color: "blue.300",
										borderColor: "blue.300",
									}}
									onClick={onClose}>
									View transactions
								</Button>
							</NextLink>
							<Button
								variant="outline"
								size="sm"
								borderColor="blue.500"
								borderRadius="3xl"
								color="blue.500"
								fontSize="13px"
								fontWeight="normal"
								ml={2}
								px={2}
								height="26px"
								_hover={{
									background: "none",
									color: "blue.300",
									borderColor: "blue.300",
								}}
								onClick={handleDeactivateAccount}>
								Disconnect
							</Button>
						</Flex>
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
