import {useMemo} from "react";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

import Header from "@components/Header";
import ProductByAddress from "@components/Product/ProductByAddress";
import ProductById from "@components/Product/ProductById";
import {getStaticPropsLocale} from "@utils/i18n";
import {getStaticPathsFallback} from "@utils/paths";
import {isNumeric} from "@utils/units";

export const getStaticPaths = getStaticPathsFallback;
export const getStaticProps = getStaticPropsLocale;
export default function AssetPage(): JSX.Element {
	const {t} = useTranslation();
	const router = useRouter();
	const {id} = router.query;
	const content = useMemo(() => {
		if (isNumeric(id as string)) {
			return <ProductById id={String(id)} />;
		}
		const split = String(id).split("/");
		if (split.length === 3) {
			const data = {
				"address": split[0],
				"token_address": split[1],
				"token_id": split[2],
			};

			return <ProductByAddress {...data} />;
		}
		return null;
	}, [id]);
	if (!content)
		return (
			<Header
				title={t<string>("common:page.explore.title")}
				subtitle={t<string>("common:page.explore.empty")}
			/>
		);
	return content;
}
