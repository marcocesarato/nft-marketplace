import {useState} from "react";
import axios from "axios";

import {GenericObject} from "@app/types";

import useIPFS from "./useIPFS";

/**
 * This is a hook that loads the TokenItem metadata in case it doesn't alreay exist
 * If metadata is missing, the object is replaced with a reactive object that updatees when the data becomes available
 * The hook will retry until request is successful (with OpenSea, for now)
 */
export default function useNFTMetadata() {
	const {resolveLink} = useIPFS();
	const [results, setResults] = useState({});

	/**
	 * Fet Metadata from Token and Cache Results
	 * @param {object} item
	 * @returns TokenItem
	 */
	function verifyMetadata(item: GenericObject) {
		//Pass Through if Metadata already present
		if (item.metadata) return item;
		//Get the Metadata
		resolveMetadata(item);
		//Return Hooked Token Object
		return results?.[item.token_uri] ? results?.[item.token_uri] : item;
	}

	/**
	 * Extract Metadata from Token
	 * Fallback: Fetch from URI
	 * @param {object} item
	 * @returns {object} TokenItem
	 */
	async function resolveMetadata(item: GenericObject): Promise<GenericObject> {
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
						{results, metadata},
					);
					//Retry That Again after 1s
					/*setTimeout(function () {
						resolveMetadata(item);
					}, 1000);*/
				} //Handle Opensea's {detail: "Request was throttled. Expected available in 1 second."}
				else {
					//No Errors
					//Set
					setMetadata(item, metadata);
					//Log
					console.debug(
						"resolveMetadata() Late-load for TokenItem Metadata " + item.token_uri,
						{
							metadata,
						},
					);
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

	/**
	 * Update Token Object
	 * @param {object} item
	 * @param {object} metadata
	 */
	function setMetadata(item: GenericObject, metadata: GenericObject) {
		//Add Metadata
		item.metadata = metadata;
		//Set Image
		if (metadata?.image) item.image = resolveLink(metadata.image);
		//Set to State
		if (metadata && !results[item.token_uri]) setResults({...results, [item.token_uri]: item});
	}

	return {verifyMetadata, resolveMetadata};
}
