import {useTranslation} from "next-i18next";
import {useContract, useSigner, useSwitchNetwork} from "wagmi";

import {ChainId} from "@configs/chain";
import {MarketAddress, MarketContract} from "@configs/contracts";
import useToast from "@hooks/useToast";
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
	const {t} = useTranslation();
	const {successToast, errorToast} = useToast();
	const contract = useContract({
		address: MarketAddress,
		abi: MarketContract,
		signerOrProvider: signer,
	});

	async function purchase(tokenId: string, price: string | number, callback = () => {}) {
		try {
			await switchNetworkAsync();

			/* user will be prompted to pay the asking proces to complete the transaction */
			const priceFormatted = !isString(price) ? parseUnits(price, "ether") : price;
			const transaction = await contract.createMarketSale(tokenId, {
				value: priceFormatted,
			});

			await transaction.wait();

			successToast({
				title: t<string>("common:page.action.purchased"),
				description: t<string>("common:page.action.success.purchased"),
			});

			callback && callback();
		} catch (error) {
			errorToast({
				description: error.message,
			});
			throw error;
		}
	}

	async function sell(url: string, formInput: SellInput) {
		try {
			await switchNetworkAsync();

			const listingPrice = await contract.getListingPrice();
			const price = parseUnits(formInput.price, "ether");
			const transaction = await contract.createToken(url, price, {
				value: listingPrice,
			});

			await transaction.wait();

			successToast({
				title: t<string>("common:page.action.sell"),
				description: t<string>("common:page.action.success.sell"),
			});
		} catch (error) {
			errorToast({
				description: error.message,
			});
			throw error;
		}
	}

	async function resell(tokenId: string, price: string | number) {
		try {
			await switchNetworkAsync();

			const priceFormatted = !isString(price) ? parseUnits(price, "ether") : price;
			let listingPrice = await contract.getListingPrice();
			listingPrice = listingPrice.toString();
			const transaction = await contract.resellMarketItem(tokenId, priceFormatted, {
				value: listingPrice,
			});

			await transaction.wait();

			successToast({
				title: t<string>("common:page.action.sell"),
				description: t<string>("common:page.action.success.sell"),
			});
		} catch (error) {
			errorToast({
				description: error.message,
			});
			throw error;
		}
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
