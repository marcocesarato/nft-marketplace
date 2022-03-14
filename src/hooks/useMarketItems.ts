import {useQuery} from "react-query";
import axios from "axios";
import {ethers} from "ethers";

import {NFTMarketItem} from "@app/types";
import {ChainUrl} from "@configs/chain";
import {MarketAddress, MarketContract} from "@configs/contracts";
import {formatUnits} from "@utils/units";

const useMarketItems = () => {
	return useQuery<NFTMarketItem[], Error>("marketItems", async () => {
		/* create a generic provider and query for unsold market items */
		const provider = new ethers.providers.JsonRpcProvider(ChainUrl);
		const contract = new ethers.Contract(MarketAddress, MarketContract.abi, provider);
		const data = await contract.fetchMarketItems();
		/**
		 * map over items returned from smart contract and format
		 * them as well as fetch their token metadata
		 */
		return await Promise.all(
			data.map(async (i) => {
				const tokenUri = await contract.tokenURI(i.tokenId);
				const meta = await axios.get(tokenUri);
				let price = formatUnits(i.price, "ether");
				return {
					price,
					tokenId: i.tokenId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					creator: i.creator,
					sold: i.sold,
					image: meta.data.image,
					name: meta.data.name,
					description: meta.data.description,
				};
			}),
		);
	});
};

export default useMarketItems;
