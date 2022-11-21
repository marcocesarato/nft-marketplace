import {useTranslation} from "next-i18next";

import {ObjectModelType} from "@app/enums";
import {TokenItem} from "@app/types";
import AssetPicker from "@components/AssetPicker";
import Header from "@components/Header";
import Loading from "@components/Loading";
import {useMarketItemsOwnedOnSaleQuery} from "@services/graphql";
import {toTokenItems} from "@utils/converters";

export type AssetOnSalePickerProps = {
	value: TokenItem;
	type?: ObjectModelType | ObjectModelType[];
	label: string;
	cleanLabel: string;
	onChange?: (asset: TokenItem | null | undefined) => void;
	onClean?: () => void;
	[key: string]: any;
};
export default function AssetOnSalePicker(props: AssetOnSalePickerProps): JSX.Element {
	const {t} = useTranslation();
	const {data, loading, error} = useMarketItemsOwnedOnSaleQuery();
	const items = toTokenItems(data?.marketItems);
	if (error) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (loading) return <Loading />;
	return <AssetPicker items={items} {...props} />;
}
