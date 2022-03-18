import {Box, HStack, Select, Text} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

export default function CatalogBar({
	count,
	onFilter = (type: string, value: string) => {},
	onSort = (type: string, value: string) => {},
	sort = null,
	filters = null,
}) {
	const {t} = useTranslation();
	return (
		<Box pb={10}>
			<HStack justifyContent="flex-end" gap={"1rem"}>
				<Text fontWeight="bold" flex={2} ml={4}>
					{t("common:catalog.count", {count})}
				</Text>
				<Select
					flex={1}
					placeholder={t("common:catalog.filter.categories")}
					marginTop={2}
					onChange={(e) => {
						onFilter("category", e.target.value);
					}}>
					<option value="/category/1">Category 1</option>
					<option value="/category/2">Category 2</option>
					<option value="/category/3">Category 3</option>
				</Select>
				<Select
					flex={1}
					placeholder={t("common:catalog.sortBy")}
					marginTop={2}
					onChange={(e) => {
						onSort("sort", e.target.value);
					}}>
					<option value="lowest">{t("common:catalog.sortType.priceASC")}</option>
					<option value="highest">{t("common:catalog.sortType.priceDESC")}</option>
					<option value="az">{t("common:catalog.sortType.nameASC")}</option>
					<option value="za">{t("common:catalog.sortType.nameDESC")}</option>
				</Select>
			</HStack>
		</Box>
	);
}
