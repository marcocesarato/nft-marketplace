import axios from "axios";

import {GenericObject, NativeTokenItem} from "@app/types";

export function getPath(uri: string | null | undefined): string {
	return uri?.split("?")[0].split("#")[0] || "";
}

export function getEmbeddedIPFSUrl(uri: string | null | undefined): string {
	const basePath = `${process.env.NEXT_PUBLIC_URL}/api/cors?url=`;
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
			data?._id ||
			encodeURIComponent(data?.owner_of + "/" + data?.token_address + "/" + data?.token_id);
	}
	return `${process.env.NEXT_PUBLIC_URL}/asset/${query}`;
}

export function getIPFSGatewayUrl(url: string): string {
	if (!url || !url.includes("ipfs://")) return url;
	return url.replace("ipfs://", "https://ipfs.io/ipfs/");
}

export function resolveIPFSUrl(url: string): string {
	return getEmbeddedIPFSUrl(getIPFSGatewayUrl(url));
}

/**
 * Extract Metadata from Token
 * Fallback: Fetch from URI
 * @param {object} item
 * @returns {object} TokenItem
 */
export async function resolveMetadata(item: NativeTokenItem) {
	//Validate URI
	if (!item.token_uri || !item.token_uri.includes("://")) {
		console.debug("resolveMetadata() Invalid URI", {URI: item.token_uri, item});
		return;
	}
	//Get Metadata
	return await axios
		.get(item.token_uri, {timeout: 3000})
		.then((metadata) => {
			if (!metadata) {
				//Log
				console.error("useVerifyMetadata.resolveMetadata() No Metadata found on URI:", {
					URI: item.token_uri,
					item,
				});
			}
			//Handle Setbacks
			else if (
				metadata?.["detail"] &&
				metadata?.["detail"].includes("Request was throttled")
			) {
				//Log
				console.warn(
					"useVerifyMetadata.resolveMetadata() Bad Result for:" +
						item.token_uri +
						"  Will retry later",
					{metadata},
				);
				//Retry That Again after 1s
				/*setTimeout(function () {
						resolveMetadata(item);
					}, 1000);*/
			} //Handle Opensea's {detail: "Request was throttled. Expected available in 1 second."}
			else {
				//No Errors
				//Set
				//setMetadata(item, metadata);
				//Log
				console.debug("resolveMetadata() Late-load for Metadata " + item.token_uri, {
					metadata,
				});
			} //Valid Result
			return item;
		})
		.catch((err) => {
			console.error("useVerifyMetadata.resolveMetadata() Error Caught:", {
				err,
				item,
				URI: item.token_uri,
			});
			return item;
		});
}
