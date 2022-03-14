import {useRouter} from "next/router";
import {ethers} from "ethers";
import {useTranslation} from "next-i18next";

import {NFTMarketItem} from "@app/types";
import Catalog from "@components/Catalog";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import Product from "@components/Product";
import {MarketAddress, MarketContract} from "@configs/contracts";
import useAccount from "@hooks/useAccount";
import useMarketItems from "@hooks/useMarketItems";
import useWeb3 from "@hooks/useWeb3";
import {getStaticPropsLocale} from "@utils/i18n";
import {parseUnits} from "@utils/units";

export const getStaticProps = getStaticPropsLocale;
export default function Explore(): JSX.Element {
	const {t} = useTranslation();
	const router = useRouter();
	const {web3} = useWeb3();
	const {isAuthenticated} = useAccount();
	const {refetch, data, error, isError, isLoading, isSuccess} = useMarketItems();
	async function purchaseItem(nft: NFTMarketItem) {
		const signer = web3.getSigner();
		const contract = new ethers.Contract(MarketAddress, MarketContract.abi, signer);

		/* user will be prompted to pay the asking proces to complete the transaction */
		const price = parseUnits(nft.price, "ether");
		const transaction = await contract.createMarketSale(nft.tokenId, {
			value: price,
		});
		await transaction.wait();
		refetch();
		router.push("/assets");
	}
	if (isError) return <Header title={t("error:title")} subtitle={error.message} />;
	if (isLoading) return <Loading />;
	if (isSuccess && !data.length)
		return (
			<Header
				title={t("common:page.explore.title")}
				subtitle={t("common:page.explore.empty")}
			/>
		);

	const handleOnPurchase = (nft: NFTMarketItem) => {
		return isAuthenticated ? () => purchaseItem(nft) : null;
	};

	return (
		<Content>
			<Header
				title={t("common:page.explore.title")}
				subtitle={t("common:page.explore.description")}
			/>
			<Catalog>
				{data.map((nft, i) => (
					<Product key={i} data={nft} onPurchase={handleOnPurchase(nft)} />
				))}
			</Catalog>
		</Content>
	);
}
