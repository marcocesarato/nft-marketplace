import {useTranslation} from "next-i18next";

import Catalog from "@components/Catalog";
import Header from "@components/Header";
import Loading from "@components/Loading";
import {useMarketItemsCreatedQuery} from "@services/graphql";
import {toTokenItems} from "@utils/converters";

type CreatedProps = {
	address: string;
	title?: string;
	subtitle?: string;
	[key: string]: any;
};

export default function Created({
	address = null,
	title = null,
	subtitle = null,
}: CreatedProps): JSX.Element {
	const {t} = useTranslation();
	const {data, error, loading} = useMarketItemsCreatedQuery({filter: {creator: address}});
	const items = toTokenItems(data?.marketItems);

	if (loading) return <Loading />;
	if (error) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (!items || !items?.length)
		return (
			<Header
				title={title ?? t<string>("common:page.dashboard.created.title")}
				subtitle={t<string>("common:page.dashboard.created.empty")}
			/>
		);
	return (
		<>
			{(title || subtitle) && <Header title={title} subtitle={subtitle} />}
			<Catalog data={items} />
		</>
	);
}
