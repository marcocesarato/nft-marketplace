import {useRouter} from "next/router";
import {SearchIcon} from "@chakra-ui/icons";
import {InputGroup, InputLeftElement, useColorModeValue as mode} from "@chakra-ui/react";
import {AsyncSelect} from "chakra-react-select";
import {useTranslation} from "next-i18next";

import useDebounceCallback from "@hooks/useDebounceCallback";
import {useMarketItemsLazyQuery} from "@services/graphql";
import {deepMerge} from "@utils/objects";
import {getAssetUrl} from "@utils/url";

const maxItems = 10;
const defaultMarketItemsSearchArgs = {variables: {filter: {sold: false}, limit: maxItems}};

export default function SearchBar(): JSX.Element {
	const {t} = useTranslation();
	const router = useRouter();
	const [geMarketItems] = useMarketItemsLazyQuery();
	const loadOptions = useDebounceCallback(async (inputValue, callback) => {
		geMarketItems(
			deepMerge(
				{
					variables: {filter: {search: inputValue}},
					onCompleted: (data) => {
						if (!data) {
							return callback([]);
						}
						const options = [
							{
								label: t<string>("common:product.item"),
								options:
									data?.marketItems?.map((item) => ({
										label: item.name,
										value: item,
									})) || [],
							},
						];
						callback(options);
					},
					onError: (error) => {
						console.error(error);
						callback([]);
					},
				},
				defaultMarketItemsSearchArgs,
			),
		);
	}, 500);

	return (
		<InputGroup
			flex={1}
			mr={4}
			boxShadow="sm"
			bg={mode("gray.100", "gray.900")}
			borderRadius="lg">
			<InputLeftElement pointerEvents="none">
				<SearchIcon color="primary" />
			</InputLeftElement>

			<AsyncSelect
				instanceId="navbarSearch"
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
				loadOptions={loadOptions}
			/>
		</InputGroup>
	);
}
