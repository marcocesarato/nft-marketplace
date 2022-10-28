import {useTranslation} from "next-i18next";
import {useNetwork} from "wagmi";

import Catalog from "@components/Catalog";
import Header from "@components/Header";
import Loading from "@components/Loading";
import {useWalletNFTsQuery} from "@services/graphql";
import {chainHex, toTokenItems} from "@utils/converters";

type OwnedProps = {
	address: string;
	title?: string;
	subtitle?: string;
	[key: string]: any;
};

export default function Owned({address, title = null, subtitle = null}: OwnedProps): JSX.Element {
	const {t} = useTranslation();
	const {chain} = useNetwork();
	const {data, loading, error} = useWalletNFTsQuery({
		variables: {
			chain: chainHex(chain),
			address,
		},
	});
	const items = toTokenItems(data?.walletNFTs);

	if (error) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (loading) return <Loading />;
	if (!items || !items?.length)
		return (
			<Header
				title={title ?? t<string>("common:page.assets.title")}
				subtitle={t<string>("common:page.assets.empty")}
			/>
		);

	return (
		<>
			{(title || subtitle) && <Header title={title} subtitle={subtitle} />}
			<Catalog data={items} />
		</>
	);
}
