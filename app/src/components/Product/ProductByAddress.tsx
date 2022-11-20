import {useTranslation} from "next-i18next";
import {useNetwork} from "wagmi";

import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import Product from "@components/Product";
import {useAccountNFTQuery} from "@services/graphql";
import {chainHex, toTokenItem} from "@utils/converters";

export type ProductByAddressProps = {
	address: string;
	token_address: string;
	token_id: number | string;
};

export default function ProductByAddress({
	address,
	token_address,
	token_id,
}: ProductByAddressProps): JSX.Element {
	const {t} = useTranslation();
	const {chain} = useNetwork();
	const {data, error, loading} = useAccountNFTQuery({
		variables: {
			chain: chainHex(chain),
			address,
			token_address,
			token_id: Number(token_id),
		},
	});
	const item = toTokenItem(data?.accountNFT);
	if (error) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (loading) return <Loading />;
	if (!item)
		return (
			<Header
				title={t<string>("common:page.explore.title")}
				subtitle={t<string>("common:page.explore.empty")}
			/>
		);
	return (
		<Content flex="1" p="8">
			<Product data={item} />
		</Content>
	);
}
