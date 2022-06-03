import {useTranslation} from "next-i18next";

import Catalog from "@components/Catalog";
import Header from "@components/Header";
import Loading from "@components/Loading";
import {useMarketItemsCreatedQuery} from "@services/graphql";

export default function Created({address}): JSX.Element {
	const {t} = useTranslation();
	const {data, error, loading} = useMarketItemsCreatedQuery({filter: {creator: address}});
	const items = data?.marketItems;

	if (loading) return <Loading />;
	if (error) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (items && !items?.length)
		return (
			<Header
				title={t<string>("common:page.dashboard.created.title")}
				subtitle={t<string>("common:page.dashboard.created.empty")}
			/>
		);
	return <Catalog data={items} />;
}
