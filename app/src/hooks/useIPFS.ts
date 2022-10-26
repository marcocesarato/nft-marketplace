import {useState} from "react";
import axios from "axios";

import {getEmbeddedIPFSImageUrl} from "@utils/url";

export default function useIPFS() {
	const [isUploading, setIsUploading] = useState(false);

	const resolveLink = (url) => {
		if (!url || !url.includes("ipfs://")) return getEmbeddedIPFSImageUrl(url);
		return getEmbeddedIPFSImageUrl(url.replace("ipfs://", "https://ipfs.io/ipfs/"));
	};

	const uploadFile = async (formData: any) => {
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

	return {isUploading, uploadFile, resolveLink};
}
