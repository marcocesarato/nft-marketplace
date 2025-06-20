import {useTranslation} from "next-i18next";
import {useContract, useSigner, useSwitchNetwork} from "wagmi";

import {ChainId} from "@configs/chain";
import {MarketAddress, MarketContract} from "@configs/contracts";
import useToast from "@hooks/useToast";
import {isString} from "@utils/objects";
import {parseUnits} from "@utils/units";

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

	async function purchase(
		token_id: string | number,
		price: string | number,
		callback = () => {},
	) {
		try {
			await switchNetworkAsync();

			/* user will be prompted to pay the asking process to complete the transaction */
			const priceFormatted = !isString(price) ? parseUnits(price, "ether") : price;
			const transaction = await contract.createMarketSale(token_id, {
				value: priceFormatted,
			});

			await transaction.wait();

			successToast({
				title: t<string>("common:action.purchased"),
				description: t<string>("common:action.success.purchasedMessage"),
			});

			callback && callback();
		} catch (error) {
			errorToast({
				title: t<string>("error:title"),
				description: error.message,
			});
			throw error;
		}
	}

	async function sell(url: string, price: string) {
		try {
			await switchNetworkAsync();

			const listingPrice = await contract.getListingPrice();
			const priceEther = parseUnits(price, "ether");
			const transaction = await contract.createToken(url, priceEther, {
				value: listingPrice,
			});

			await transaction.wait();

			successToast({
				title: t<string>("common:action.sell"),
				description: t<string>("common:action.success.sellMessage"),
			});
		} catch (error) {
			errorToast({
				title: t<string>("error:title"),
				description: error.message,
			});
			throw error;
		}
	}

	async function resell(token_id: string | number, price: string | number) {
		try {
			await switchNetworkAsync();

			const priceFormatted = !isString(price) ? parseUnits(price, "ether") : price;
			let listingPrice = await contract.getListingPrice();
			listingPrice = listingPrice.toString();
			const transaction = await contract.resellMarketItem(token_id, priceFormatted, {
				value: listingPrice,
			});

			await transaction.wait();

			successToast({
				title: t<string>("common:action.sell"),
				description: t<string>("common:page.action.success.sellMessage"),
			});
		} catch (error) {
			errorToast({
				title: t<string>("error:title"),
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
