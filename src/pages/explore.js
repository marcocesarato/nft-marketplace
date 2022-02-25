import {ethers} from "ethers";
import useMarketItems from "@hooks/useMarketItems";

import Product from "@components/Product";
import Catalog from "@components/Catalog";
import Content from "@components/Content";
import Loading from "@components/Loading";
import Header from "@components/Header";

import {MarketContract, NFTAddress, MarketAddress} from "@configs/contracts";
import useAccount from "@hooks/useAccount";

export default function Explore() {
	const {provider} = useAccount();
	const {refetch, data, error, isError, isLoading, isSuccess} = useMarketItems();
	async function purchaseItem(nft) {
		const signer = provider.getSigner();
		const contract = new ethers.Contract(MarketAddress, MarketContract.abi, signer);

		/* user will be prompted to pay the asking proces to complete the transaction */
		const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
		const transaction = await contract.createMarketSale(NFTAddress, nft.tokenId, {
			value: price,
		});
		await transaction.wait();
		refetch();
	}
	if (isError) return <Header title="Error" subtitle={error.message} />;
	if (isLoading) return <Loading />;
	if (isSuccess && !data.length)
		return <Header title="Explore" subtitle="No items on marketplace." />;
	return (
		<Content>
			<Header title="Explore" subtitle="Explore latest arts on sale." />
			<Catalog>
				{data.map((nft, i) => (
					<Product key={i} data={nft} onBuy={() => purchaseItem(nft)} />
				))}
			</Catalog>
		</Content>
	);
}
