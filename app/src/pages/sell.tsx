import {useState} from "react";
import {useRouter} from "next/router";
import {
	Badge,
	Box,
	Button,
	FormControl,
	FormLabel,
	Image,
	Input,
	Stack,
	Textarea,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {SellInput} from "@app/types";
import Content from "@components/Content";
import Dropzone, {DropzoneType} from "@components/Dropzone";
import Header from "@components/Header";
import Loader from "@components/Loader";
import Required from "@components/Required";
import Subtitle from "@components/Subtitle";
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
	const [imageUrl, setImageUrl] = useState(null);
	const [message, setMessage] = useState("");
	const [error, setError] = useState(null);
	const [formInput, updateFormInput] = useState<SellInput>({
		price: "",
		name: "",
		description: "",
		image: null,
		animation: null,
		externalUrl: null,
	});
	const [isProcessing, setProcessing] = useState(false);
	const router = useRouter();
	const {sell, isLoading, isError: isMarketError, error: marketError} = useMarket();

	async function onChangeImage(fileStream: File) {
		setError(null);
		updateFormInput({...formInput, image: fileStream});
		setImageUrl(URL.createObjectURL(fileStream));
	}

	async function createSale(url: string) {
		setMessage(t<string>("common:page.sell.minting"));
		await sell(url, formInput.price);
		setMessage("");
		router.push("/explore");
	}

	function createFormDataFile(input: SellInput) {
		const formData = new FormData();
		formData.append("name", input.name);
		formData.append("description", input.description);
		formData.append("image", input.image);
		formData.append("animation", input.animation || null);
		formData.append("externalUrl", input.externalUrl || null);
		return formData;
	}

	async function createMarket() {
		const {name, description, price, image} = formInput;
		if (!name || !description || !price || !image) return;
		try {
			setProcessing(true);
			setMessage(t<string>("common:page.sell.uploading"));
			const formData = createFormDataFile(formInput);
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
				<Subtitle fontSize="xs" align={"right"}>
					<Required mr={2} />
					{t<string>("common:page.sell.requiredFields")}
				</Subtitle>
				{isMarketError && (
					<ErrorAlert
						error={t<string>("error:unexpectedError")}
						message={marketError.message}
					/>
				)}
				{error && (
					<ErrorAlert
						error={t<string>("error:unexpectedError")}
						message={error.message}
					/>
				)}
				<FormControl>
					<FormLabel>
						{t<string>("common:page.sell.asset.name")}
						<Required />
					</FormLabel>
					<Input
						value={formInput.name}
						placeholder={t<string>("common:page.sell.asset.placeholder.name")}
						onChange={(e) => updateFormInput({...formInput, name: e.target.value})}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>
						{t<string>("common:page.sell.asset.description")}
						<Required />
					</FormLabel>
					<Subtitle fontSize="xs" colorScheme="gray">
						{t<string>("common:page.sell.asset.descriptionSubtitle")}
					</Subtitle>
					<Textarea
						value={formInput.description}
						placeholder={t<string>("common:page.sell.asset.placeholder.description")}
						onChange={(e) =>
							updateFormInput({...formInput, description: e.target.value})
						}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>
						{t<string>("common:page.sell.asset.price")} {balance?.symbol}
						<Required />
					</FormLabel>
					<Input
						type="number"
						min="0"
						step=".01"
						value={formInput.price}
						placeholder="0.00"
						onChange={(e) => updateFormInput({...formInput, price: e.target.value})}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>{t<string>("common:page.sell.asset.externalUrl")}</FormLabel>
					<Subtitle fontSize="xs" colorScheme="gray">
						{t<string>("common:page.sell.asset.externalUrlSubtitle")}
					</Subtitle>
					<Input
						type="url"
						value={formInput.externalUrl}
						placeholder="https://yoursite.net/item/123"
						onChange={(e) =>
							updateFormInput({...formInput, externalUrl: e.target.value})
						}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>
						{t<string>("common:page.sell.asset.image")}
						<Required />
					</FormLabel>
					<Dropzone
						onFileAccepted={onChangeImage}
						type={DropzoneType.Image}
						name="image"
					/>
					{imageUrl && (
						<Box my={2}>
							<Image
								fallbackSrc="/assets/images/empty.jpg"
								htmlWidth="350"
								src={imageUrl}
								alt={formInput.name}
								borderRadius={"2xl"}
							/>
							<Badge
								fontSize="1em"
								colorScheme="green"
								borderRadius={0}
								py={1}
								px={3}
								mt={2}>
								{formInput.image.name}
							</Badge>
						</Box>
					)}
				</FormControl>
				<FormControl>
					<FormLabel>{t<string>("common:page.sell.asset.item")}</FormLabel>
					<Dropzone
						onFileAccepted={(file) => updateFormInput({...formInput, animation: file})}
						type={DropzoneType.Animation}
						name="animation"
					/>
					{formInput.animation && (
						<Badge
							fontSize="1em"
							colorScheme="green"
							borderRadius={0}
							my={1}
							py={1}
							px={3}
							mt={2}>
							{formInput.animation.name}
						</Badge>
					)}
				</FormControl>
				<FormControl>
					<Button width="full" onClick={createMarket}>
						{t<string>("common:page.sell.action.create")}
					</Button>
				</FormControl>
			</Stack>
		</Content>
	);
}
