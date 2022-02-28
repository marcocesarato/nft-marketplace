import {useState} from "react";
import axios from "axios";

import useIPFS from "./useIPFS";

/**
 * This is a hook that loads the NFT metadata in case it doesn't alreay exist
 * If metadata is missing, the object is replaced with a reactive object that updatees when the data becomes available
 * The hook will retry until request is successful (with OpenSea, for now)
 */
export default function useNFTMetadata() {
	const {resolveLink} = useIPFS();
	const [results, setResults] = useState({});

	/**
	 * Fet Metadata  from NFT and Cache Results
	 * @param {object} NFT
	 * @returns NFT
	 */
	function verifyMetadata(NFT) {
		//Pass Through if Metadata already present
		if (NFT.metadata) return NFT;
		//Get the Metadata
		withMetadata(NFT);
		//Return Hooked NFT Object
		return results?.[NFT.token_uri] ? results?.[NFT.token_uri] : NFT;
	}

	/**
	 * Extract Metadata from NFT,
	 *  Fallback: Fetch from URI
	 * @param {object} NFT
	 * @returns {object} NFT
	 */
	async function withMetadata(NFT) {
		//Validate URI
		if (!NFT.token_uri || !NFT.token_uri.includes("://")) {
			console.log("withMetadata() Invalid URI", {URI: NFT.token_uri, NFT});
			return;
		}
		//Get Metadata
		return await axios
			.get(NFT.token_uri)
			.then((metadata) => {
				if (!metadata) {
					//Log
					console.error("useVerifyMetadata.withMetadata() No Metadata found on URI:", {
						URI: NFT.token_uri,
						NFT,
					});
				}
				//Handle Setbacks
				else if (metadata?.detail && metadata.detail.includes("Request was throttled")) {
					//Log
					console.warn(
						"useVerifyMetadata.withMetadata() Bad Result for:" +
							NFT.token_uri +
							"  Will retry later",
						{results, metadata},
					);
					//Retry That Again after 1s
					setTimeout(function () {
						withMetadata(NFT);
					}, 1000);
				} //Handle Opensea's {detail: "Request was throttled. Expected available in 1 second."}
				else {
					//No Errors
					//Set
					setMetadata(NFT, metadata);
					//Log
					console.verbose("withMetadata() Late-load for NFT Metadata " + NFT.token_uri, {
						metadata,
					});
				} //Valid Result
				return NFT;
			})
			.catch((err) => {
				console.error("useVerifyMetadata.withMetadata() Error Caught:", {
					err,
					NFT,
					URI: NFT.token_uri,
				});
			});
	}

	/**
	 * Update NFT Object
	 * @param {object} NFT
	 * @param {object} metadata
	 */
	function setMetadata(NFT, metadata) {
		//Add Metadata
		NFT.metadata = metadata;
		//Set Image
		if (metadata?.image) NFT.image = resolveLink(metadata.image);
		//Set to State
		if (metadata && !results[NFT.token_uri]) setResults({...results, [NFT.token_uri]: NFT});
	}

	return {verifyMetadata, withMetadata};
}
