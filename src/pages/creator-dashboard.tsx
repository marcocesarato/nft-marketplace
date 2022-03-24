import {Box} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Catalog from "@components/Catalog";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useMarketItemsCreated from "@hooks/useMarketItemsCreated";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function CreatorDashboard(): JSX.Element {
	const {t} = useTranslation();
	const {data, error, isError, isLoading, isSuccess} = useMarketItemsCreated();
	const sold = data?.filter((i) => i.sold) || [];

	if (isLoading) return <Loading />;
	if (isError) return <Header title={t("error:title")} subtitle={error.message} />;
	if (isSuccess && !data?.length)
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
			<Catalog data={data} />
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
