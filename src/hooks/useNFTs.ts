import {useMoralisWeb3Api} from "react-moralis";
import {useQuery} from "react-query";

import {NFT} from "@app/types";
import {MarketAddress} from "@configs/contracts";
import {isString} from "@utils/objects";

import useAccount from "./useAccount";
import useIPFS from "./useIPFS";
import useNFTMetadata from "./useNFTMetadata";

const useNFTs = () => {
	const Web3Api = useMoralisWeb3Api();
	const {account, chainId} = useAccount();
	const {withMetadata} = useNFTMetadata();
	const {resolveLink} = useIPFS();
	return useQuery<NFT[], Error>(
		["NFTs", account, chainId],
		async () => {
			const options = {
				chain: chainId,
				address: account,
			};
			const optionsContract = {
				...options,
				token_address: MarketAddress,
			};
			// fix: Trigger specific contract sync
			await Web3Api.account.geNFTsForContract(optionsContract as any);
			// Load all NFTs
			const data = await Web3Api.account.geNFTs(options as any);
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
		},
		{enabled: !!(chainId && account)},
	);
};

export default useNFTs;
