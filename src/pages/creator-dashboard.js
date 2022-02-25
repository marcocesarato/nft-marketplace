import {Box} from "@chakra-ui/react";

import Product from "@components/Product";
import Catalog from "@components/Catalog";
import Content from "@components/Content";
import Loading from "@components/Loading";
import Header from "@components/Header";

import useMarketItemsCreated from "@hooks/useMarketItemsCreated";

export default function CreatorDashboard() {
	const {data, error, isError, isLoading, isSuccess} = useMarketItemsCreated();
	const sold = data?.filter((i) => i.sold) || [];

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
