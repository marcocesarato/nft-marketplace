import {useState} from "react";
import {Box, Stack, useBreakpointValue} from "@chakra-ui/react";
import {Select} from "chakra-react-select";
import {useTranslation} from "next-i18next";

export default function CatalogFilterBar({
	onFilter = (type: string, value: string | string[]) => {},
	onSort = (sort: string) => {},
	sort = null,
	filters = null,
}) {
	const {t} = useTranslation();
	const [sortBy, setSortBy] = useState(sort);
	const [categories, setCategories] = useState(filters?.categories || []);
	const hasRowDirection = useBreakpointValue({base: false, md: true});
	const filterOptions = [
		{value: "newest", label: t<string>("common:catalog.sortType.newest")},
		{value: "lowest", label: t<string>("common:catalog.sortType.priceASC")},
		{value: "highest", label: t<string>("common:catalog.sortType.priceDESC")},
		{value: "likes", label: t<string>("common:catalog.sortType.mostLikes")},
	];
	const categoriesOptions = [
		{value: "category1", label: "Category 1"},
		{value: "category2", label: "Category 2"},
		{value: "category3", label: "Category 3"},
		{value: "category4", label: "Category 4"},
	];
	return (
		<Box pb={10} mx={4}>
			<Stack
				justifyContent="flex-end"
				direction={hasRowDirection ? "row" : "column"}
				gap={"1rem"}>
				<Box flex={2}>
					<Select
						isMulti
						isSearchable={false}
						placeholder={t<string>("common:catalog.filter.categories")}
						value={categories}
						options={categoriesOptions}
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
				<Box flex={1}>
					<Select
						placeholder={t<string>("common:catalog.sortBy")}
						value={sortBy}
						options={filterOptions}
						onChange={(option) => {
							setSortBy(option);
							onSort && onSort(option.value);
						}}
					/>
				</Box>
			</Stack>
		</Box>
	);
}
