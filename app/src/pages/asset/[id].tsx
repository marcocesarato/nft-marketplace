import {useMemo} from "react";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

import Header from "@components/Header";
import ProductByAddress from "@components/Product/ProductByAddress";
import ProductById from "@components/Product/ProductById";
import {getServerSidePropsSession} from "@utils/ssr";
import {isNumeric} from "@utils/units";

export const getServerSideProps = getServerSidePropsSession;
export default function SingleAsset(): JSX.Element {
	const {t} = useTranslation();
	const router = useRouter();
	const {id} = router.query;
	const content = useMemo(() => {
		if (isNumeric(id as string)) {
			return <ProductById id={id as string} />;
		}
		const splitted = (id as string).split("/");
		if (splitted.length === 3) {
			const data = {
				"account": splitted[0],
				"tokenAddress": splitted[1],
				"tokenId": splitted[2],
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
