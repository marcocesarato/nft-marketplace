import {Box} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Catalog from "@components/Catalog";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useAccount from "@hooks/useAccount";
import {useMarketItemsCreatedQuery} from "@services/graphql";
import {getServerSidePropsHandler} from "@utils/ssr";

export const getServerSideProps = getServerSidePropsHandler();
export default function CreatorDashboard(): JSX.Element {
	const {t} = useTranslation();
	const {isConnected} = useAccount();
	const {data, error, loading} = useMarketItemsCreatedQuery();
	const items = data?.marketItems;
	const sold = items?.filter((i) => i.sold) || [];
	if (!isConnected)
		return (
			<Header title={t<string>("error:title")} subtitle={t<string>("error:auth.required")} />
		);

	if (loading) return <Loading />;
	if (error) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (items && !items?.length)
		return (
			<Header
				title={t<string>("common:page.dashboard.created.title")}
				subtitle={t<string>("common:page.dashboard.created.empty")}
			/>
		);
	return (
		<Content>
			<Header
				title={t<string>("common:page.dashboard.created.title")}
				subtitle={t<string>("common:page.dashboard.created.description")}
			/>
			<Catalog data={items} />
			{Boolean(sold.length) && (
				<Box mt={8}>
					<Header
						title={t<string>("common:page.dashboard.sold.title")}
						subtitle={t<string>("common:page.dashboard.sold.description")}
					/>
					<Catalog data={sold} />
				</Box>
			)}
		</Content>
	);
}
