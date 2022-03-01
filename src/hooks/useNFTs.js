import {useNFTBalances} from "react-moralis";
import {useQuery} from "react-query";

import {isString} from "@utils/objects";

import useIPFS from "./useIPFS";
import useNFTMetadata from "./useNFTMetadata";

const useNFTs = () => {
	const {getNFTBalances} = useNFTBalances(null, {autoFetch: false});
	const {withMetadata} = useNFTMetadata();
	const {resolveLink} = useIPFS();
	return useQuery("NFTs", async () => {
		const data = await getNFTBalances();
		if (data?.result) {
			return await Promise.all(
				data.result.map(async (nft) => {
					if (!nft?.metadata) {
						nft = await withMetadata(nft);
					}
					if (nft?.metadata) {
						if (isString(nft.metadata)) nft.metadata = JSON.parse(nft.metadata);
						if (nft.metadata?.data) nft.metadata = nft.metadata.data;
						nft.image = resolveLink(nft.metadata?.image);
					}
					return nft;
				}),
			);
		}
		return [];
	});
};

export default useNFTs;
