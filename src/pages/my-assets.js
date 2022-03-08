import {useState} from "react";
import {useMoralis} from "react-moralis";

import Catalog from "@components/Catalog";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import Product from "@components/Product";
import useNFTs from "@hooks/useNFTs";

//import useMarketItemsOwned from "@hooks/useMarketItemsOwned";

export default function MyAssets() {
	const {Moralis} = useMoralis();
	const {data, error, isError, isSuccess, isLoading} = useNFTs();
	//const {data, error, isError, isLoading, isSuccess} = useMarketItemsOwned();
	const [isPending, setIsPending] = useState(false);

	async function transfer(nft, amount, receiver) {
		console.log(nft, amount, receiver);
		const options = {
			type: nft?.contract_type?.toLowerCase(),
			tokenId: nft?.token_id,
			receiver,
			contractAddress: nft?.token_address,
		};
		if (options.type === "erc1155") {
			options.amount = amount ?? nft.amount;
		}
		setIsPending(true);
		try {
			const tx = await Moralis.transfer(options);
			console.log(tx);
			setIsPending(false);
		} catch (e) {
			alert(e.message);
			setIsPending(false);
		}
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
