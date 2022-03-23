import {useMemo} from "react";
import {ethers} from "ethers";

import {MarketAddress, MarketContract} from "@configs/contracts";
import useWeb3 from "@hooks/useWeb3";
import {isString} from "@utils/objects";
import {parseUnits} from "@utils/units";

export default function useMarket() {
	const {web3} = useWeb3();
	const signer = useMemo(() => web3?.getSigner(), [web3]);
	const contract = useMemo(
		() => new ethers.Contract(MarketAddress, MarketContract, signer),
		[signer],
	);

	/**
	 * Purchase
	 * @param tokenId
	 * @param callback
	 */
	async function purchase(tokenId, price: string | number, callback = () => {}) {
		/* user will be prompted to pay the asking proces to complete the transaction */
		const priceFormatted = !isString(price) ? parseUnits(price, "ether") : price;
		const transaction = await contract.createMarketSale(tokenId, {
			value: priceFormatted,
		});
		await transaction.wait();
		callback && callback();
	}

	/**
	 * Resell
	 * @param tokenId
	 * @param amount
	 */
	async function resell(tokenId, price: string | number) {
		const priceFormatted = !isString(price) ? parseUnits(price, "ether") : price;
		let listingPrice = await contract.getListingPrice();
		listingPrice = listingPrice.toString();
		let transaction = await contract.resellMarketItem(tokenId, priceFormatted, {
			value: listingPrice,
		});
		await transaction.wait();
	}

	return {purchase, resell};
}
