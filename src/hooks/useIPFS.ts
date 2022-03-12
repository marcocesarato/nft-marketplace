import {useMoralisFile} from "react-moralis";

export default function useIPFS() {
	const {error, isUploading, saveFile} = useMoralisFile();

	const resolveLink = (url) => {
		if (!url || !url.includes("ipfs://")) return url;
		return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
	};

	const saveIPFS = async (name, file) => {
		const upload = await saveFile(name, file, {saveIPFS: true});
		if (upload?.["ipfs"]) {
			return resolveLink(upload?.["ipfs"]());
		}
		return upload;
	};

	return {error, isUploading, saveIPFS, resolveLink};
}
