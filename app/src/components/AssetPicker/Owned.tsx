import {useTranslation} from "next-i18next";
import {useAccount, useNetwork} from "wagmi";

import {TokenItem} from "@app/types";
import AssetPicker from "@components/AssetPicker";
import Header from "@components/Header";
import Loading from "@components/Loading";
import {useWalletNFTsQuery} from "@services/graphql";
import {chainHex} from "@utils/converters";

type AssetOwnedPickerProps = {
	value?: TokenItem;
	label: string;
	labelClean: string;
	onChange: (asset: TokenItem) => void;
	onClean: () => void;
	[key: string]: any;
};
export default function AssetOwnedPicker(props: AssetOwnedPickerProps): JSX.Element {
	const {t} = useTranslation();
	const {address} = useAccount();
	const {chain} = useNetwork();
	const {data, loading, error} = useWalletNFTsQuery({
		variables: {
			chain: chainHex(chain),
			address,
		},
	});
	const items = data?.walletNFTs;
	if (error) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (loading) return <Loading />;
	return <AssetPicker items={items} {...props} />;
}
