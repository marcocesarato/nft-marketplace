import {useTranslation} from "next-i18next";
import {useAccount, useNetwork} from "wagmi";

import {ObjectModelType} from "@app/enums";
import {TokenItem} from "@app/types";
import AssetPicker from "@components/AssetPicker";
import Header from "@components/Header";
import Loading from "@components/Loading";
import {useWalletNFTsQuery} from "@services/graphql";
import {chainHex, toTokenItems} from "@utils/converters";

export type AssetOwnedPickerProps = {
	value: TokenItem;
	type?: ObjectModelType | ObjectModelType[];
	label: string;
	cleanLabel: string;
	onChange?: (asset: TokenItem | null | undefined) => void;
	onClean?: () => void;
	[key: string]: any;
};
export default function AssetOwnedPicker(props: AssetOwnedPickerProps): JSX.Element {
	const {t} = useTranslation();
	const {address} = useAccount();
	const {chain} = useNetwork();
	const {data, loading, error} = useWalletNFTsQuery({
		variables: {
			chain: chainHex(chain),
			address: address as string,
		},
	});
	const items = toTokenItems(data?.walletNFTs);
	if (error) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (loading) return <Loading />;
	return <AssetPicker items={items} {...props} />;
}
