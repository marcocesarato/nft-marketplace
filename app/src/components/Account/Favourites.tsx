import {useTranslation} from "next-i18next";

import Catalog from "@components/Catalog";
import Header from "@components/Header";
import Loading from "@components/Loading";
import {useMarketItemsByIdsQuery} from "@services/graphql";
import {toTokenItems} from "@utils/converters";

export type FavouritesProps = {
	items?: Array<number> | null;
	title?: string;
	subtitle?: string;
	[key: string]: any;
};

export default function Favourites({items, title, subtitle}: FavouritesProps): JSX.Element {
	const {t} = useTranslation();
	const {data, error, loading} = useMarketItemsByIdsQuery(items ?? []);
	const marketItems = toTokenItems(data?.marketItems);

	if (loading) return <Loading />;
	if (error) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (!marketItems || !marketItems?.length)
		return (
			<Header
				title={title ?? t<string>("common:page.assets.title")}
				subtitle={t<string>("common:page.assets.empty")}
			/>
		);

	return (
		<>
			{(title || subtitle) && <Header title={title} subtitle={subtitle} />}
			<Catalog data={marketItems} />
		</>
	);
}
