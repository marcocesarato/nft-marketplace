import {useState} from "react";
import {Box, HStack, Text} from "@chakra-ui/react";
import {Select} from "chakra-react-select";
import {useTranslation} from "next-i18next";

export default function CatalogBar({
	count,
	onFilter = (type: string, value: string | string[]) => {},
	onSort = (sort: string) => {},
	sort = null,
	filters = null,
}) {
	const {t} = useTranslation();
	const [sortBy, setSortBy] = useState(sort);
	const [categories, setCategories] = useState(filters?.categories || []);
	const filterOptions = [
		{value: "newest", label: t("common:catalog.sortType.newest")},
		{value: "lowest", label: t("common:catalog.sortType.priceASC")},
		{value: "highest", label: t("common:catalog.sortType.priceDESC")},
		{value: "views", label: t("common:catalog.sortType.mostViews")},
		{value: "likes", label: t("common:catalog.sortType.mostLikes")},
	];
	const categoriesOptions = [
		{value: "category1", label: "Category 1"},
		{value: "category2", label: "Category 2"},
		{value: "category3", label: "Category 3"},
		{value: "category4", label: "Category 4"},
	];
	return (
		<Box pb={10}>
			<HStack justifyContent="flex-end" gap={"1rem"}>
				<Text fontWeight="bold" flex={2} ml={4}>
					{t("common:catalog.count", {count})}
				</Text>
				<Box flex={2} marginTop={2}>
					<Select
						isMulti
						placeholder={t("common:catalog.filter.categories")}
						value={categories}
						options={categoriesOptions}
						isSearchable={false}
						chakraStyles={{
							multiValue: (provided, state) => ({
								...provided,
								flex: 1,
							}),
							multiValueLabel: (provided, state) => ({
								...provided,
								textOverflow: "ellipsis",
								flex: 1,
								whiteSpace: "nowrap",
								overflow: "hidden",
								display: "initial",
							}),
							valueContainer: (provided, state) => ({
								...provided,
								height: "38px",
							}),
						}}
						onChange={(options) => {
							const values = options.map(function (s) {
								return s.value;
							});
							setCategories(options);
							onFilter && onFilter("categories", values);
						}}
					/>
				</Box>
				<Box flex={1} marginTop={2}>
					<Select
						placeholder={t("common:catalog.sortBy")}
						value={sortBy}
						options={filterOptions}
						onChange={(option) => {
							setSortBy(option);
							onSort && onSort(option.value);
						}}
					/>
				</Box>
			</HStack>
		</Box>
	);
}
