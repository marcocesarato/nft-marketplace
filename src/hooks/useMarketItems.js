import {ethers} from "ethers";
import {useQuery} from "react-query";
import axios from "axios";
import {NFTContract, MarketContract, NFTAddress, MarketAddress} from "@configs/contracts";
import {ChainUrl} from "@configs/chain";
import {formatUnits} from "@utils/units";

const useMarketItems = () => {
	return useQuery("marketItems", async () => {
		/* create a generic provider and query for unsold market items */
		const provider = new ethers.providers.JsonRpcProvider(ChainUrl);
		const tokenContract = new ethers.Contract(NFTAddress, NFTContract.abi, provider);
		const marketContract = new ethers.Contract(MarketAddress, MarketContract.abi, provider);
		const data = await marketContract.fetchMarketItems();
		/**
		 * map over items returned from smart contract and format
		 * them as well as fetch their token metadata
		 */
		return await Promise.all(
			data.map(async (i) => {
				const tokenUri = await tokenContract.tokenURI(i.tokenId);
				const meta = await axios.get(tokenUri);
				let price = formatUnits(i.price, "ether");
				return {
					price,
					tokenId: i.tokenId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					image: meta.data.image,
					name: meta.data.name,
					description: meta.data.description,
				};
			}),
		);
	});
};

export default useMarketItems;
