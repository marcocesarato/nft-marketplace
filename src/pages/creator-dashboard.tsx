import {Box} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Catalog from "@components/Catalog";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import {getStaticPropsLocale} from "@utils/i18n";

import {useMarketItemsCreatedQuery} from "../services/graphql";

export const getStaticProps = getStaticPropsLocale;
export default function CreatorDashboard(): JSX.Element {
	const {t} = useTranslation();
	const {data, error, loading} = useMarketItemsCreatedQuery();
	const items = data?.marketItems;
	const sold = items?.filter((i) => i.sold) || [];

	if (loading) return <Loading />;
	if (error) return <Header title={t("error:title")} subtitle={error.message} />;
	if (items && !items?.length)
		return (
			<Header
				title={t("common:page.dashboard.created.title")}
				subtitle={t("common:page.dashboard.created.empty")}
			/>
		);
	return (
		<Content>
			<Header
				title={t("common:page.dashboard.created.title")}
				subtitle={t("common:page.dashboard.created.description")}
			/>
			<Catalog data={items} />
			{Boolean(sold.length) && (
				<Box mt={8}>
					<Header
						title={t("common:page.dashboard.sold.title")}
						subtitle={t("common:page.dashboard.sold.description")}
					/>
					<Catalog data={sold} />
				</Box>
			)}
		</Content>
	);
}
