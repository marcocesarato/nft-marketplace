import {useTranslation} from "next-i18next";

import Catalog from "@components/Catalog";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import {useMarketItemsOnSaleQuery} from "@services/graphql";
import {getServerSidePropsHandler} from "@utils/ssr";

export const getServerSideProps = getServerSidePropsHandler();
export default function Explore(): JSX.Element {
	const {t} = useTranslation();
	const {data, loading, error} = useMarketItemsOnSaleQuery();
	const items = data?.marketItems;

	if (error) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (loading) return <Loading />;
	if (items && !items.length)
		return (
			<Header
				title={t<string>("common:page.explore.title")}
				subtitle={t<string>("common:page.explore.empty")}
			/>
		);

	return (
		<Content>
			<Header
				title={t<string>("common:page.explore.title")}
				subtitle={t<string>("common:page.explore.description")}
			/>
			<Catalog data={items} purchasable />
		</Content>
	);
}
