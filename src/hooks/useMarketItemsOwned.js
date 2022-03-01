import {ethers} from "ethers";
import {useQuery} from "react-query";
import axios from "axios";

import {NFTContract, MarketContract, NFTAddress, MarketAddress} from "@configs/contracts";
import {formatUnits} from "@utils/units";

import useWeb3 from "./useWeb3";

const useOwnedMarketItems = () => {
	const {web3} = useWeb3();
	return useQuery("marketItemsOwned", async () => {
		if (!web3) return [];
		const signer = web3.getSigner();
		const marketContract = new ethers.Contract(MarketAddress, MarketContract.abi, signer);
		const tokenContract = new ethers.Contract(NFTAddress, NFTContract.abi, web3);
		const data = await marketContract.fetchItemsOwned();

		return await Promise.all(
			data.map(async (i) => {
				const tokenUri = await tokenContract.tokenURI(i.tokenId);
				const meta = await axios.get(tokenUri);
				let price = formatUnits(i.price.toString(), "ether");
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
