import {useState} from "react";
import {useRouter} from "next/router";
import {Button, FormControl, FormLabel, Image, Input, Stack, Textarea} from "@chakra-ui/react";
import {ethers} from "ethers";
import {useTranslation} from "next-i18next";

import Content from "@components/Content";
import Dropzone from "@components/Dropzone";
import Header from "@components/Header";
import Loader from "@components/Loader";
import {MarketAddress, MarketContract} from "@configs/contracts";
import {useConfig} from "@contexts/Global";
import useBalance from "@hooks/useBalance";
import useIPFS from "@hooks/useIPFS";
import useWeb3 from "@hooks/useWeb3";
import {getServerSidePropsSession} from "@utils/ssr";
import {parseUnits} from "@utils/units";

export const getServerSideProps = getServerSidePropsSession;
export default function Sell(): JSX.Element {
	const {t} = useTranslation();
	const {isLogged} = useConfig();
	const {nativeToken} = useBalance();
	const {saveIPFS} = useIPFS();
	const {web3} = useWeb3();
	const [fileUrl, setFileUrl] = useState(null);
	const [message, setMessage] = useState("");
	const [formInput, updateFormInput] = useState({
		price: "",
		name: "",
		description: "",
		file: null,
	});
	const [isProcessing, setProcessing] = useState(false);
	const router = useRouter();

	async function onChange(fileStream) {
		updateFormInput({...formInput, file: fileStream});
		setFileUrl(URL.createObjectURL(fileStream));
	}

	async function createSale(url) {
		const signer = web3.getSigner() as any;

		setMessage(t<string>("common:page.sell.minting"));
		const contract = new ethers.Contract(MarketAddress, MarketContract, signer);
		const listingPrice = await contract.getListingPrice();

		const price = parseUnits(formInput.price, "ether");
		const transaction = await contract.createToken(url, price, {
			value: listingPrice,
		});

		await transaction.wait();
		setMessage(t<string>("common:page.sell.approved"));
		router.push("/explore");
	}

	function createFormDataFile(name: string, description: string, file) {
		const formData = new FormData();
		formData.append("name", name);
		formData.append("description", description);
		formData.append("file", file);
		return formData;
	}

	async function createMarket() {
		const {name, description, price, file} = formInput;
		if (!name || !description || !price || !file) return;
		try {
			setProcessing(true);
			setMessage(t<string>("common:page.sell.uploading"));
			const formData = createFormDataFile(name, description, file);
			const url = await saveIPFS(formData);
			createSale(url);
		} catch (error) {
			console.error("Error uploading file: ", error);
			setProcessing(false);
		}
	}

	if (!isLogged)
		return (
			<Header title={t<string>("error:title")} subtitle={t<string>("error:auth.required")} />
		);

	if (isProcessing) return <Loader message={message} />;
	return (
		<Content alignItems="center">
			<Stack align="stretch" width="100%" maxWidth={768}>
				<Header
					title={t<string>("common:page.sell.title")}
					subtitle={t<string>("common:page.sell.description")}
				/>
				<FormControl>
					<FormLabel>{t<string>("common:page.sell.asset.name")}</FormLabel>
					<Input
						onChange={(e) => updateFormInput({...formInput, name: e.target.value})}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>{t<string>("common:page.sell.asset.description")}</FormLabel>
					<Textarea
						onChange={(e) =>
							updateFormInput({...formInput, description: e.target.value})
						}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>
						{t<string>("common:page.sell.asset.price")} {nativeToken?.symbol}
					</FormLabel>
					<Input
						type="number"
						min="0"
						step=".01"
						onChange={(e) => updateFormInput({...formInput, price: e.target.value})}
					/>
				</FormControl>
				<FormControl>
					<Dropzone onFileAccepted={onChange} />
				</FormControl>
				<FormControl>
					<Button width="full" onClick={createMarket}>
						{t<string>("common:page.sell.action.create")}
					</Button>
				</FormControl>
				{fileUrl && (
					<Image
						fallbackSrc="/assets/images/empty.jpg"
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
