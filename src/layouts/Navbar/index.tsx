import {Box, Flex, useDisclosure} from "@chakra-ui/react";

import AccountModal from "@layouts/AccountModal";

import {ColorModeSwitcher} from "./ColorModeSwitcher";
import ConnectButton from "./ConnectButton";
import LocaleMenu from "./LocaleMenu";
import SearchBar from "./SearchBar";

export default function Navbar(): JSX.Element {
	const {isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose} = useDisclosure();

	return (
		<Box px={4} my="15px">
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<SearchBar />
				<Flex ml="auto" alignItems={"center"}>
					<ConnectButton openAccountModal={onModalOpen} />
					<LocaleMenu />
					<AccountModal isOpen={isModalOpen} onClose={onModalClose} />
					<ColorModeSwitcher />
				</Flex>
			</Flex>
		</Box>
	);
}
