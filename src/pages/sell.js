import {useState} from "react";
import {ethers} from "ethers";
import {useRouter} from "next/router";
import {Image, FormControl, FormLabel, Input, Button, Stack} from "@chakra-ui/react";

import {NFTContract, MarketContract, NFTAddress, MarketAddress} from "@configs/contracts";

import useWeb3 from "@hooks/useWeb3";
import useBalance from "@hooks/useBalance";
import useIPFS from "@hooks/useIPFS";

import Content from "@components/Content";
import Loader from "@components/Loader";
import Header from "@components/Header";
import Dropzone from "@components/Dropzone";

import {parseUnits} from "@utils/units";

export default function CreateItem() {
	const {nativeToken} = useBalance();
	const {saveIPFS} = useIPFS();
	const {web3} = useWeb3();
	const [fileUrl, setFileUrl] = useState(null);
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

		let contract = new ethers.Contract(NFTAddress, NFTContract.abi, signer);
		let transaction = await contract.createToken(url);
		let tx = await transaction.wait();
		let event = tx.events[0];
		let value = event.args[2];
		let tokenId = value.toNumber();

		contract = new ethers.Contract(MarketAddress, MarketContract.abi, signer);

		const price = parseUnits(formInput.price, "ether");
		transaction = await contract.createMarketItem(NFTAddress, tokenId, price);

		await transaction.wait();
		setProcessing(false);
		router.push("/");
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
			const url = await saveIPFS("metadata.json", {base64: btoa(data)});
			createSale(url);
		} catch (error) {
			console.log("Error uploading file: ", error);
			setProcessing(false);
		}
	}

	if (isProcessing)
		return <Loader message="We are processing your transaction. Please check your wallet..." />;
	return (
		<Content alignItems="center">
			<Stack align="stretch" width="100%" maxWidth={768}>
				<Header title="Sell assets" subtitle="Fill the form and sell your digital asset." />
				;
				<FormControl>
					<FormLabel>Asset Name</FormLabel>
					<Input
						onChange={(e) => updateFormInput({...formInput, name: e.target.value})}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Asset Description</FormLabel>
					<Input
						onChange={(e) =>
							updateFormInput({...formInput, description: e.target.value})
						}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Asset Price in {nativeToken?.symbol}</FormLabel>
					<Input
						onChange={(e) => updateFormInput({...formInput, price: e.target.value})}
					/>
				</FormControl>
				<FormControl>
					<Dropzone onFileAccepted={onChange} />
				</FormControl>
				<FormControl>
					<Button isFullWidth onClick={createMarket}>
						Create digital asset
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
