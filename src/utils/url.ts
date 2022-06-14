import {GenericObject} from "@app/types";

export function getPath(uri: string | null | undefined): string {
	return uri?.split("?")[0].split("#")[0] || "";
}

export function getEmbeddedIPFSImageUrl(uri: string | null | undefined): string {
	const basePath = `${process.env.NEXT_PUBLIC_URL}/api/ipfs?cid=`;
	const query = encodeURIComponent(uri);
	return basePath + query;
}

export function getGalleryBuilderUrl() {
	return `${process.env.NEXT_PUBLIC_URL}/builder`;
}

export function getGalleryUrl(address: string = "") {
	return `${process.env.NEXT_PUBLIC_URL}/gallery/${address}`;
}

export function getAccountUrl(address: string) {
	return `${process.env.NEXT_PUBLIC_URL}/account/${address}`;
}

export function getAssetUrl(data: GenericObject | string) {
	let query: string;
	if (typeof data === "string") {
		query = data;
	} else {
		query =
			data._id ||
			encodeURIComponent(
				(data.owner || data.owner_of) + "/" + data.token_address + "/" + data.token_id,
			);
	}
	return `${process.env.NEXT_PUBLIC_URL}/asset/${query}`;
}
