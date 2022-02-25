import {ethers} from "ethers";
import {useQuery} from "react-query";
import axios from "axios";

import {NFTContract, MarketContract, NFTAddress, MarketAddress} from "@configs/contracts";
import useAccount from "@hooks/useAccount";

const useOwnedMarketItems = () => {
	const {provider} = useAccount();
	return useQuery("marketItemsOwned", async () => {
		if (!provider) return [];
		const signer = provider.getSigner();
		const marketContract = new ethers.Contract(MarketAddress, MarketContract.abi, signer);
		const tokenContract = new ethers.Contract(NFTAddress, NFTContract.abi, provider);
		const data = await marketContract.fetchItemsOwned();

		return await Promise.all(
			data.map(async (i) => {
				const tokenUri = await tokenContract.tokenURI(i.tokenId);
				const meta = await axios.get(tokenUri);
				let price = ethers.utils.formatUnits(i.price.toString(), "ether");
				return {
					price,
					tokenId: i.tokenId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					image: meta.data.image,
					name: meta.data.name,
				};
			}),
		);
	});
};

export default useOwnedMarketItems;
