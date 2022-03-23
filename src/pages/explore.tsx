import {useTranslation} from "next-i18next";

import Catalog from "@/src/components/Catalog/Catalog";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import {useMarketItemsQuery} from "@services/subgraph";
import {withMetadata} from "@utils/converters";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function Explore(): JSX.Element {
	const {t} = useTranslation();
	const {data, loading, error} = useMarketItemsQuery();
	const items = withMetadata(data?.marketItems);

	if (error) return <Header title={t("error:title")} subtitle={error.message} />;
	if (loading) return <Loading />;
	if (items && !items.length)
		return (
			<Header
				title={t("common:page.explore.title")}
				subtitle={t("common:page.explore.empty")}
			/>
		);

	return (
		<Content>
			<Header
				title={t("common:page.explore.title")}
				subtitle={t("common:page.explore.description")}
			/>
			<Catalog data={items} purchasable />
		</Content>
	);
}
