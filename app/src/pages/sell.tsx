import {useState} from "react";
import {useRouter} from "next/router";
import {Button, FormControl, FormLabel, Image, Input, Stack, Textarea} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Content from "@components/Content";
import Dropzone from "@components/Dropzone";
import Header from "@components/Header";
import Loader from "@components/Loader";
import ErrorAlert from "@errors/ErrorAlert";
import useAccount from "@hooks/useAccount";
import useBalance from "@hooks/useBalance";
import useIPFS from "@hooks/useIPFS";
import useMarket from "@hooks/useMarket";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function Sell(): JSX.Element {
	const {t} = useTranslation();
	const {isConnected} = useAccount();
	const {data: balance} = useBalance();
	const {uploadFile} = useIPFS();
	const [fileUrl, setFileUrl] = useState(null);
	const [message, setMessage] = useState("");
	const [error, setError] = useState(null);
	const [formInput, updateFormInput] = useState({
		price: "",
		name: "",
		description: "",
		file: null,
	});
	const [isProcessing, setProcessing] = useState(false);
	const router = useRouter();
	const {sell, isLoading, isError: isMarketError, error: marketError} = useMarket();

	async function onChange(fileStream: any) {
		setError(null);
		updateFormInput({...formInput, file: fileStream});
		setFileUrl(URL.createObjectURL(fileStream));
	}

	async function createSale(url: string) {
		setMessage(t<string>("common:page.sell.minting"));
		await sell(url, formInput);
		setMessage("");
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
			const url = await uploadFile(formData);
			createSale(url);
		} catch (e) {
			console.error("Error uploading file: ", e);
			setProcessing(false);
			setError(e);
		}
	}

	if (!isConnected)
		return (
			<Header title={t<string>("error:title")} subtitle={t<string>("error:auth.required")} />
		);

	if (isProcessing || isLoading) return <Loader message={message} />;

	return (
		<Content alignItems="center">
			<Stack align="stretch" width="100%" maxWidth={768}>
				<Header
					title={t<string>("common:page.sell.title")}
					subtitle={t<string>("common:page.sell.description")}
				/>
				{isMarketError && (
					<ErrorAlert
						error={t<string>("error:auth.unexpectedError")}
						message={marketError.message}
					/>
				)}
				{error && (
					<ErrorAlert
						error={t<string>("error:auth.unexpectedError")}
						message={error.message}
					/>
				)}
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
						{t<string>("common:page.sell.asset.price")} {balance?.symbol}
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
