import {useQuery} from "react-query";
import axios from "axios";
import {ethers} from "ethers";

import {NFTMarketItem} from "@app/types";
import {MarketAddress, MarketContract} from "@configs/contracts";
import {formatUnits} from "@utils/units";

import useWeb3 from "./useWeb3";

const useMarketItemsCreated = () => {
	const {web3} = useWeb3();
	return useQuery<NFTMarketItem[], Error>("marketItemsCreated", async () => {
		if (!web3) return [];
		const signer = web3.getSigner();
		const contract = new ethers.Contract(MarketAddress, MarketContract, signer);
		const data = await contract.fetchItemsCreated();

		return await Promise.all(
			data.map(async (i: NFTMarketItem) => {
				const tokenUri = await contract.tokenURI(i.tokenId);
				const meta = await axios.get(tokenUri);
				let price = formatUnits(i.price.toString(), "ether");
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

export default useMarketItemsCreated;
