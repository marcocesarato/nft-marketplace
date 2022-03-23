import {SearchIcon} from "@chakra-ui/icons";
import {
	Box,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	useColorModeValue as mode,
	useDisclosure,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import AccountModal from "@layouts/AccountModal";

import {ColorModeSwitcher} from "./ColorModeSwitcher";
import ConnectButton from "./ConnectButton";
import LocaleMenu from "./LocaleMenu";

export default function Navbar(): JSX.Element {
	const {t} = useTranslation();
	const {isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose} = useDisclosure();
	return (
		<Box px={4} my="15px">
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<InputGroup flex={1} mr={4} boxShadow="sm">
					<InputLeftElement
						pointerEvents="none"
						children={<SearchIcon color="primary" />}
					/>
					<Input
						border={0}
						focusBorderColor="none"
						type="search"
						bg={mode("gray.100", "gray.900")}
						placeholder={t("common:search.assets")}
					/>
				</InputGroup>

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
