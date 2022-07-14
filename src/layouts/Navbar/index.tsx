import {useRouter} from "next/router";
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
import {useMarketItemsLazyQuery} from "@services/graphql";
import {deepMerge} from "@utils/objects";
import {getAssetUrl} from "@utils/url";

import {ColorModeSwitcher} from "./ColorModeSwitcher";
import ConnectButton from "./ConnectButton";
import LocaleMenu from "./LocaleMenu";

const maxSearchItems = 10;
const defaultMarketItemsSearchArgs = {filter: {sold: false}, limit: maxSearchItems};

export default function Navbar(): JSX.Element {
	const {t} = useTranslation();
	const router = useRouter();
	const [geMarketItems] = useMarketItemsLazyQuery({
		variables: defaultMarketItemsSearchArgs,
	});
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
						onChange={(data) => {
							const item = (data as any)?.value;
							if (item) router.push(getAssetUrl(item));
						}}
						focusBorderColor="none"
						placeholder={t<string>("common:search.assets")}
						loadOptions={(inputValue, callback) => {
							const loadData = async () => {
								const {data} = await geMarketItems(
									deepMerge(
										{variables: {filters: {search: inputValue}}},
										defaultMarketItemsSearchArgs,
									),
								);
								const options = !data
									? []
									: [
											{
												label: t<string>("common:product.item"),
												options: data.marketItems.map((item) => ({
													label: item.name,
													value: item,
												})),
											},
									  ];
								callback(options);
							};
							loadData();
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
