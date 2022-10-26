import {useTranslation} from "next-i18next";
import {useNetwork} from "wagmi";

import {chainHex} from "@/src/utils/converters";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import {useAccountNFTQuery} from "@services/graphql";

import ProductDetails from "./ProductDetails";

export default function ProductByAddress({address, tokenAddress, tokenId}): JSX.Element {
	const {t} = useTranslation();
	const {chain} = useNetwork();
	const {data, error, loading} = useAccountNFTQuery({
		variables: {
			chain: chainHex(chain),
			address,
			tokenAddress,
			tokenId,
		},
	});
	const item = data?.accountNFT;
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
			<ProductDetails data={item} />
		</Content>
	);
}
