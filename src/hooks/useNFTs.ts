import {useNFTBalances} from "react-moralis";
import {useQuery} from "react-query";

import {TNFT} from "@app/types";
import {isString} from "@utils/objects";

import useIPFS from "./useIPFS";
import useNFTMetadata from "./useNFTMetadata";

const useNFTs = () => {
	const {getNFTBalances} = useNFTBalances(null, {autoFetch: false});
	const {withMetadata} = useNFTMetadata();
	const {resolveLink} = useIPFS();
	return useQuery<TNFT[], Error>("NFTs", async () => {
		const data = await getNFTBalances();
		if (data?.result) {
			return await Promise.all(
				data.result.map(async (nft) => {
					if (!nft?.metadata) {
						nft = await withMetadata(nft);
					}
					if (nft?.metadata) {
						if (isString(nft.metadata)) nft.metadata = JSON.parse(nft.metadata);
						if (typeof nft.metadata === "object") {
							if (nft.metadata["data"]) nft.metadata = nft.metadata["data"];
							if (nft.metadata["image"])
								nft.metadata["image"] = resolveLink(nft.metadata["image"]);
						}
					}
					return nft;
				}),
			);
		}
		return [];
	});
};

export default useNFTs;
