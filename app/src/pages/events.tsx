import {useTranslation} from "next-i18next";

import Content from "@components/Content";
import Header from "@components/Header";
import useAccount from "@hooks/useAccount";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function EventsPage(): JSX.Element {
	const {t} = useTranslation();
	const {isConnected} = useAccount();
	//const {data, error, loading} = useMarketItemsCreatedQuery();
	//const items = toTokenItems(data?.marketItems);
	if (!isConnected)
		return (
			<Header title={t<string>("error:title")} subtitle={t<string>("error:auth.required")} />
		);

	/*if (loading) return <Loading />;
	if (error) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (items && !items?.length)
		return (
			<Header
				title={t<string>("common:page.events.title")}
				subtitle={t<string>("common:page.events.empty")}
			/>
		);*/
	return (
		<Content>
			<Header
				title={t<string>("common:page.events.title")}
				subtitle={t<string>("common:page.events.description")}
			/>
		</Content>
	);
}
