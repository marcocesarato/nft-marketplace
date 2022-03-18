import {useMemo, useState} from "react";
import {ethers} from "ethers";
import {useTranslation} from "next-i18next";

import Catalog from "@/src/components/Catalog/Catalog";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import {MarketAddress, MarketContract} from "@configs/contracts";
import useNFTs from "@hooks/useNFTs";
import useWeb3 from "@hooks/useWeb3";
//import useMarketItemsOwned from "@hooks/useMarketItemsOwned";
import {getStaticPropsLocale} from "@utils/i18n";
import {parseUnits} from "@utils/units";

export const getStaticProps = getStaticPropsLocale;
export default function MyAssets(): JSX.Element {
	const {t} = useTranslation();
	const {web3} = useWeb3();
	const {data: rawData, error, isError, isSuccess, isLoading} = useNFTs();
	//const {data, error, isError, isLoading, isSuccess} = useMarketItemsOwned();
	const [isPending, setIsPending] = useState(false);
	const data = useMemo(() => {
		if (!isSuccess) return [];
		return rawData.map((item) => item.metadata);
	}, [isSuccess, rawData]);

	async function resellItem(id, amount) {
		setIsPending(true);
		const signer = web3.getSigner();
		const priceFormatted = parseUnits(amount, "ether");
		let contract = new ethers.Contract(MarketAddress, MarketContract, signer);
		let listingPrice = await contract.getListingPrice();

		listingPrice = listingPrice.toString();
		let transaction = await contract.resellMarketItem(id, priceFormatted, {
			value: listingPrice,
		});
		await transaction.wait();
	}

	if (isError) return <Header title={t("error:title")} subtitle={error.message} />;
	if (isLoading) return <Loading />;
	if (isSuccess && !data.length)
		<Header title={t("common:page.assets.title")} subtitle={t("common:page.assets.empty")} />;
	return (
		<Content>
			<Header
				title={t("common:page.assets.title")}
				subtitle={t("common:page.assets.description")}
			/>
			<Catalog data={data} />
		</Content>
	);
}
