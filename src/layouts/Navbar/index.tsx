import {HamburgerIcon, SearchIcon} from "@chakra-ui/icons";
import {
	Box,
	Flex,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	useColorModeValue as mode,
	useDisclosure,
} from "@chakra-ui/react";

import {useMenu} from "@contexts/Global";
import AccountModal from "@layouts/AccountModal";

import {ColorModeSwitcher} from "./ColorModeSwitcher";
import ConnectButton from "./ConnectButton";
import LocaleMenu from "./LocaleMenu";

export default function Navbar(): JSX.Element {
	const {onToggleMenu} = useMenu();
	const {isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose} = useDisclosure();
	return (
		<Box px={4} my="15px">
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<InputGroup flex={1} mr={4} boxShadow="sm">
					<InputLeftElement pointerEvents="none" children={<SearchIcon color="main" />} />
					<Input
						border={0}
						focusBorderColor="none"
						type="search"
						bg={mode("gray.100", "gray.900")}
						placeholder="Search assets here..."
					/>
				</InputGroup>

				<Flex ml="auto" alignItems={"center"}>
					<ConnectButton openAccountModal={onModalOpen} />
					<LocaleMenu />
					<AccountModal isOpen={isModalOpen} onClose={onModalClose} />
					<ColorModeSwitcher />
					<IconButton
						size={"md"}
						fontSize="lg"
						icon={<HamburgerIcon />}
						variant="ghost"
						marginLeft="2"
						color="current"
						aria-label={"Open Menu"}
						display={{lg: "none"}}
						onClick={onToggleMenu}
					/>
				</Flex>
			</Flex>
		</Box>
	);
}
