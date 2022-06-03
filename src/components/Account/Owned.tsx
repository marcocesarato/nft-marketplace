import {useMemo} from "react";
import {useTranslation} from "next-i18next";

import Catalog from "@components/Catalog";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useNFTs from "@hooks/useNFTs";

export default function Owned({address = null}): JSX.Element {
	const {t} = useTranslation();
	const {data: rawData, error, isError, isSuccess, isLoading} = useNFTs({address});
	const data = useMemo(() => {
		if (!isSuccess) return [];
		return rawData?.map((item) => item?.metadata) || [];
	}, [isSuccess, rawData]);

	if (isError) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (isLoading) return <Loading />;
	if (isSuccess && !data.length)
		return (
			<Header
				title={t<string>("common:page.assets.title")}
				subtitle={t<string>("common:page.assets.empty")}
			/>
		);

	return <Catalog data={data} />;
}
