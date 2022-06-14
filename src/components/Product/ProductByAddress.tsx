import {useMemo} from "react";
import {useTranslation} from "next-i18next";

import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useNFTs from "@hooks/useNFTs";

import ProductDetails from "./ProductDetails";

export default function ProductByAddress({account, tokenAddress, tokenId}): JSX.Element {
	const {t} = useTranslation();

	const {data: rawData, error, isError, isSuccess, isLoading} = useNFTs({address: account});
	const data = useMemo(() => {
		if (!isSuccess) return [];
		return rawData?.map((item) => item?.metadata) || [];
	}, [isSuccess, rawData]);
	const item = useMemo(() => {
		if (data.length) {
			return data.find(
				(item) => item["token_address"] === tokenAddress && item["token_id"] === tokenId,
			);
		}
		return null;
	}, [data, tokenAddress, tokenId]);
	if (isError) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (isLoading) return <Loading />;
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
