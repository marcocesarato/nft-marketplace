import {SearchIcon} from "@chakra-ui/icons";
import {
	Box,
	Flex,
	InputGroup,
	InputLeftElement,
	useColorModeValue as mode,
	useDisclosure,
} from "@chakra-ui/react";
import {AsyncSelect} from "chakra-react-select";
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
				<InputGroup
					flex={1}
					mr={4}
					boxShadow="sm"
					bg={mode("gray.100", "gray.900")}
					borderRadius="lg">
					<InputLeftElement
						pointerEvents="none"
						children={<SearchIcon color="primary" />}
					/>
					<AsyncSelect
						chakraStyles={{
							container: (provided, state) => ({
								...provided,
								width: "full",
								ml: "10",
								focusBorderColor: "none",
							}),
							control: (provided, state) => ({
								...provided,
								focusBorderColor: "none",
								border: 0,
								cursor: "text",
							}),
							dropdownIndicator: () => ({
								display: "none",
							}),
							menu: (provided, state) => ({
								...provided,
								boxShadow: "md",
							}),
						}}
						focusBorderColor="none"
						placeholder={t<string>("common:search.assets")}
						closeMenuOnSelect={false}
						loadOptions={(inputValue, callback) => {
							setTimeout(() => {
								callback([]);
							}, 3000);
						}}
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
