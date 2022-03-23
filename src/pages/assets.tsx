import {useMemo} from "react";
import {useTranslation} from "next-i18next";

import Catalog from "@/src/components/Catalog/Catalog";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useNFTs from "@hooks/useNFTs";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function MyAssets(): JSX.Element {
	const {t} = useTranslation();
	const {data: rawData, error, isError, isSuccess, isLoading} = useNFTs();
	const data = useMemo(() => {
		if (!isSuccess) return [];
		return rawData.map((item) => item.metadata);
	}, [isSuccess, rawData]);

	if (isError) return <Header title={t("error:title")} subtitle={error.message} />;
	if (isLoading) return <Loading />;
	if (isSuccess && !data.length)
		<Header title={t("common:page.assets.title")} subtitle={t("common:page.assets.empty")} />;
	return (
		<Content>
			<Header
				title={t("common:page.assets.title")}
				subtitle={t("common:page.assets.description")}
			/>
			<Catalog data={data} />
		</Content>
	);
}
