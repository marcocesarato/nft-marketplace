import {useState} from "react";
import axios from "axios";

import {resolveIPFSUrl} from "@utils/url";

export default function useIPFS() {
	const [isUploading, setIsUploading] = useState(false);

	const uploadFile = async (formData: any) => {
		setIsUploading(true);
		try {
			const {data} = await axios.post("/api/upload", formData, {
				headers: {"Content-Type": "multipart/form-data"},
			});
			setIsUploading(false);
			return resolveIPFSUrl(data.url);
		} catch (err) {
			setIsUploading(false);
			throw err;
		}
	};

	return {isUploading, uploadFile, resolveLink: resolveIPFSUrl};
}
