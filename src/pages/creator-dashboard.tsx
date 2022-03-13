import {Box} from "@chakra-ui/react";

import Catalog from "@components/Catalog";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import Product from "@components/Product";
import useMarketItemsCreated from "@hooks/useMarketItemsCreated";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function CreatorDashboard(): JSX.Element {
	const {data, error, isError, isLoading, isSuccess} = useMarketItemsCreated();
	const sold = data?.filter((i) => i.owner) || [];

	if (isLoading) return <Loading />;
	if (isError) return <Header title="Error" subtitle={error.message} />;
	if (isSuccess && !data?.length)
		return <Header title="Assets created" subtitle="No assets created." />;
	return (
		<Content>
			<Header title="Assets created" subtitle="Browse your assets created." />
			<Catalog>
				{data.map((nft, i) => (
					<Product key={i} data={nft} />
				))}
			</Catalog>
			{Boolean(sold.length) && (
				<Box mt={8}>
					<Header title="Assets sold" subtitle="Browse your assets sold." />
					<Catalog>
						{sold.map((nft, i) => (
							<Product key={i} data={nft} />
						))}
					</Catalog>
				</Box>
			)}
		</Content>
	);
}
