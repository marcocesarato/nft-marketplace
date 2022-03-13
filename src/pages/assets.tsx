import {useState} from "react";
import {ethers} from "ethers";

import Catalog from "@components/Catalog";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import Product from "@components/Product";
import {MarketAddress, MarketContract} from "@configs/contracts";
import useNFTs from "@hooks/useNFTs";
import useWeb3 from "@hooks/useWeb3";
//import useMarketItemsOwned from "@hooks/useMarketItemsOwned";
import {getStaticPropsLocale} from "@utils/i18n";
import {parseUnits} from "@utils/units";

export const getStaticProps = getStaticPropsLocale;
export default function MyAssets(): JSX.Element {
	const {web3} = useWeb3();
	const {data, error, isError, isSuccess, isLoading} = useNFTs();
	//const {data, error, isError, isLoading, isSuccess} = useMarketItemsOwned();
	const [isPending, setIsPending] = useState(false);

	async function resaleItem(id, amount) {
		setIsPending(true);
		const signer = web3.getSigner();
		const priceFormatted = parseUnits(amount, "ether");
		let contract = new ethers.Contract(MarketAddress, MarketContract.abi, signer);
		let listingPrice = await contract.getListingPrice();

		listingPrice = listingPrice.toString();
		let transaction = await contract.resaleMarketItem(id, priceFormatted, {
			value: listingPrice,
		});
		await transaction.wait();
	}

	if (isError) return <Header title="Error" subtitle={error.message} />;
	if (isLoading) return <Loading />;
	if (isSuccess && !data.length) <Header title="Assets owned" subtitle="No assets owned." />;
	return (
		<Content>
			<Header title="Assets owned" subtitle="Browse your assets." />
			<Catalog>
				{data?.map((nft) => {
					return (
						<Product
							key={`${nft?.token_address}${nft?.token_id}`}
							data={nft?.metadata}
						/>
					);
				})}
			</Catalog>
		</Content>
	);
}
