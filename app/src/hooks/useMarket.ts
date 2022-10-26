import {useContract, useSigner, useSwitchNetwork} from "wagmi";

import {ChainId} from "@configs/chain";
import {MarketAddress, MarketContract} from "@configs/contracts";
import {isString} from "@utils/objects";
import {parseUnits} from "@utils/units";

type SellInput = {
	price: string;
	name: string;
	description: string;
	file: any;
};

export default function useMarket() {
	const {data: signer, isError, isLoading, error} = useSigner();
	const {
		error: errorNetwork,
		isLoading: isLoadingNetwork,
		isError: isErrorNetwork,
		switchNetworkAsync,
	} = useSwitchNetwork({chainId: ChainId});
	const contract = useContract({
		address: MarketAddress,
		abi: MarketContract,
		signerOrProvider: signer,
	});

	async function purchase(tokenId: string, price: string | number, callback = () => {}) {
		await switchNetworkAsync();

		/* user will be prompted to pay the asking proces to complete the transaction */
		const priceFormatted = !isString(price) ? parseUnits(price, "ether") : price;
		const transaction = await contract.createMarketSale(tokenId, {
			value: priceFormatted,
		});
		await transaction.wait();
		callback && callback();
	}

	async function sell(url: string, formInput: SellInput) {
		await switchNetworkAsync();

		const listingPrice = await contract.getListingPrice();

		const price = parseUnits(formInput.price, "ether");
		const transaction = await contract.createToken(url, price, {
			value: listingPrice,
		});

		await transaction.wait();
	}

	async function resell(tokenId: string, price: string | number) {
		await switchNetworkAsync();

		const priceFormatted = !isString(price) ? parseUnits(price, "ether") : price;
		let listingPrice = await contract.getListingPrice();
		listingPrice = listingPrice.toString();
		const transaction = await contract.resellMarketItem(tokenId, priceFormatted, {
			value: listingPrice,
		});
		await transaction.wait();
	}

	return {
		purchase,
		sell,
		resell,
		error: error || errorNetwork,
		isError: isError || isErrorNetwork,
		isLoading: isLoading || isLoadingNetwork,
	};
}
