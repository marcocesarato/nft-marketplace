import {useTranslation} from "next-i18next";

import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import Product from "@components/Product";
import useMarket from "@hooks/useMarket";
import {useMarketItemQuery} from "@services/graphql";
import {toTokenItem} from "@utils/converters";

export type ProductByIdProps = {id: string};

export default function ProductById({id}: ProductByIdProps): JSX.Element {
	const {t} = useTranslation();
	const {purchase} = useMarket();

	const {data, loading, error} = useMarketItemQuery({
		variables: {filter: {"_id": parseInt(id as string)}},
	});
	const item = toTokenItem(data?.marketItem);

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
			<Product data={item} onPurchase={!item.sold ? purchase : null} />
		</Content>
	);
}
