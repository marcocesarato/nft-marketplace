import {useState} from "react";
import axios from "axios";

export default function useIPFS() {
	const [isUploading, setIsUploading] = useState(false);

	const resolveLink = (url) => {
		if (!url || !url.includes("ipfs://")) return url;
		return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
	};

	const saveIPFS = async (formData: any) => {
		setIsUploading(true);
		try {
			const {data} = await axios.post("/api/upload", formData, {
				headers: {"Content-Type": "multipart/form-data"},
			});
			setIsUploading(false);
			return resolveLink(data.url);
		} catch (err) {
			setIsUploading(false);
			throw err;
		}
	};

	return {isUploading, saveIPFS, resolveLink};
}
