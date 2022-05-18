import {useRouter} from "next/router";
import {GetStaticPaths} from "next/types";
import {useTranslation} from "next-i18next";

import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import ProductDetails from "@components/Product/ProductDetails";
import useMarket from "@hooks/useMarket";
import {useMarketItemQuery} from "@services/graphql";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function SingleAsset(): JSX.Element {
	const {t} = useTranslation();
	const router = useRouter();
	const {id} = router.query;
	const {purchase} = useMarket();
	const {data, loading, error} = useMarketItemQuery({
		variables: {filter: {"_id": parseInt(id as string)}},
	});
	const item = data?.marketItem;
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
			<ProductDetails data={item} onPurchase={purchase} />
		</Content>
	);
}

export const getStaticPaths: GetStaticPaths<{slug: string}> = async () => {
	return {
		paths: [],
		fallback: "blocking",
	};
};
