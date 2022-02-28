import {
	Box,
	Flex,
	HStack,
	IconButton,
	useDisclosure,
	useColorModeValue,
	Stack,
	Text,
} from "@chakra-ui/react";
import {HamburgerIcon, CloseIcon} from "@chakra-ui/icons";

import useAccount from "@hooks/useAccount";

import NavLink from "./NavLink";
import AccountModal from "../AccountModal";
import ConnectButton from "./ConnectButton";
import {ColorModeSwitcher} from "./ColorModeSwitcher";

export default function Navbar() {
	const {isAuthenticated} = useAccount();
	const {isOpen, onOpen, onClose} = useDisclosure();
	const {isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose} = useDisclosure();

	const links = [
		{label: "Home", href: "/"},
		{label: "Explore", href: "/explore"},
	];

	// Wallet connection required links
	if (isAuthenticated) {
		links.push(
			{label: "Dashboard", href: "/creator-dashboard"},
			{label: "My Assets", href: "/my-assets"},
			{label: "Sell Asset", href: "/sell"},
		);
	}

	return (
		<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<IconButton
					size={"md"}
					icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
					aria-label={"Open Menu"}
					display={{md: "none"}}
					onClick={isOpen ? onClose : onOpen}
				/>
				<HStack spacing={8} alignItems={"center"}>
					<Box>
						<Text fontWeight={800}>Marketplace</Text>
					</Box>
					<HStack as={"nav"} spacing={4} display={{base: "none", md: "flex"}}>
						{links.map((link) => (
							<NavLink key={link.href} link={link} />
						))}
					</HStack>
				</HStack>
				<Flex alignItems={"center"}>
					<ConnectButton openAccountModal={onModalOpen} />
					<AccountModal isOpen={isModalOpen} onClose={onModalClose} />
					<ColorModeSwitcher />
				</Flex>
			</Flex>

			{isOpen ? (
				<Box pb={4} display={{md: "none"}}>
					<Stack as={"nav"} spacing={4}>
						{links.map((link) => (
							<NavLink key={link.href} link={link}>
								{link}
							</NavLink>
						))}
					</Stack>
				</Box>
			) : null}
		</Box>
	);
}
