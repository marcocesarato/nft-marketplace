import {useState} from "react";
import {useRouter} from "next/router";
import {Button, FormControl, FormLabel, Image, Input, Stack} from "@chakra-ui/react";
import {ethers} from "ethers";
import {useTranslation} from "next-i18next";

import useAccount from "@app/hooks/useAccount";
import Content from "@components/Content";
import Dropzone from "@components/Dropzone";
import Header from "@components/Header";
import Loader from "@components/Loader";
import {MarketAddress, MarketContract} from "@configs/contracts";
import useBalance from "@hooks/useBalance";
import useIPFS from "@hooks/useIPFS";
import useWeb3 from "@hooks/useWeb3";
import {getStaticPropsLocale} from "@utils/i18n";
import {parseUnits} from "@utils/units";

export const getStaticProps = getStaticPropsLocale;
export default function CreateItem(): JSX.Element {
	const {t} = useTranslation();
	const {isAuthenticated} = useAccount();
	const {nativeToken} = useBalance();
	const {saveIPFS} = useIPFS();
	const {web3} = useWeb3();
	const [fileUrl, setFileUrl] = useState(null);
	const [message, setMessage] = useState("");
	const [formInput, updateFormInput] = useState({price: "", name: "", description: ""});
	const [isProcessing, setProcessing] = useState(false);
	const router = useRouter();

	async function onChange(file) {
		try {
			const url = await saveIPFS("asset", file);
			setFileUrl(url);
		} catch (error) {
			console.log("Error uploading file: ", error);
		}
	}

	async function createSale(url) {
		const signer = web3.getSigner();

		setMessage(t("common:page.sell.minting"));
		const contract = new ethers.Contract(MarketAddress, MarketContract, signer);
		const listingPrice = await contract.getListingPrice();

		const price = parseUnits(formInput.price, "ether");
		const transaction = await contract.createToken(url, price, {
			value: listingPrice,
		});

		await transaction.wait();
		setMessage(t("common:page.sell.approved"));
		router.push("/explore");
	}

	async function createMarket() {
		const {name, description, price} = formInput;
		if (!name || !description || !price || !fileUrl) return;
		// first, upload to IPFS
		const data = JSON.stringify({
			name,
			description,
			image: fileUrl,
		});
		try {
			setProcessing(true);
			setMessage(t("common:page.sell.uploading"));
			const url = await saveIPFS("metadata.json", {base64: btoa(data)});
			createSale(url);
		} catch (error) {
			console.log("Error uploading file: ", error);
			setProcessing(false);
		}
	}

	if (!isAuthenticated)
		return <Header title={t("error:title")} subtitle={t("error:auth.required")} />;

	if (isProcessing) return <Loader message={message} />;
	return (
		<Content alignItems="center">
			<Stack align="stretch" width="100%" maxWidth={768}>
				<Header
					title={t("common:page.sell.title")}
					subtitle={t("common:page.sell.description")}
				/>
				<FormControl>
					<FormLabel>{t("common:page.sell.asset.name")}</FormLabel>
					<Input
						onChange={(e) => updateFormInput({...formInput, name: e.target.value})}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>{t("common:page.sell.asset.description")}</FormLabel>
					<Input
						onChange={(e) =>
							updateFormInput({...formInput, description: e.target.value})
						}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>
						{t("common:page.sell.asset.price")} {nativeToken?.symbol}
					</FormLabel>
					<Input
						onChange={(e) => updateFormInput({...formInput, price: e.target.value})}
					/>
				</FormControl>
				<FormControl>
					<Dropzone onFileAccepted={onChange} />
				</FormControl>
				<FormControl>
					<Button isFullWidth onClick={createMarket}>
						{t("common:page.sell.action.create")}
					</Button>
				</FormControl>
				{fileUrl && (
					<Image
						htmlWidth="350"
						src={fileUrl}
						alt={formInput.name}
						borderRadius={"2xl"}
					/>
				)}
			</Stack>
		</Content>
	);
}
