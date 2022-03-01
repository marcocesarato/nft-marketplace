import {ethers} from "ethers";

import Catalog from "@components/Catalog";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import Product from "@components/Product";
import {MarketAddress, MarketContract, NFTAddress} from "@configs/contracts";
import useMarketItems from "@hooks/useMarketItems";
import useAccount from "@hooks/useAccount";
import useWeb3 from "@hooks/useWeb3";
import {parseUnits} from "@utils/units";

export default function Explore() {
	const {web3} = useWeb3();
	const {isAuthenticated} = useAccount();
	const {refetch, data, error, isError, isLoading, isSuccess} = useMarketItems();
	async function purchaseItem(nft) {
		const signer = web3.getSigner();
		const contract = new ethers.Contract(MarketAddress, MarketContract.abi, signer);

		/* user will be prompted to pay the asking proces to complete the transaction */
		const price = parseUnits(nft.price, "ether");
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

	const handleOnPurchase = (nft) => {
		return isAuthenticated ? () => purchaseItem(nft) : null;
	};

	return (
		<Content>
			<Header title="Explore" subtitle="Explore latest arts on sale." />
			<Catalog>
				{data.map((nft, i) => (
					<Product key={i} data={nft} onPurchase={handleOnPurchase(nft)} />
				))}
			</Catalog>
		</Content>
	);
}
