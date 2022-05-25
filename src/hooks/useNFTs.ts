import {useMoralisWeb3Api} from "react-moralis";
import {useQuery} from "react-query";

import type {NFT} from "@app/types";
import {MarketAddress} from "@configs/contracts";
import {isString} from "@utils/objects";

import useAccount from "./useAccount";
import useIPFS from "./useIPFS";
import useNFTMetadata from "./useNFTMetadata";

const useNFTs = ({address = null} = {}) => {
	const Web3Api = useMoralisWeb3Api();
	const {account, chainId} = useAccount();
	const {withMetadata} = useNFTMetadata();
	const {resolveLink} = useIPFS();
	const resultMap = async (nft) => {
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
	};
	const accountAddress = address ?? account;
	return useQuery<NFT[], Error>(
		["NFTs", account, chainId],
		async () => {
			const options = {
				chain: chainId,
				address: accountAddress,
			};
			const optionsContract = {
				...options,
				token_address: MarketAddress,
			};
			// fix: Trigger specific contract sync
			await Web3Api.account.getNFTsForContract(optionsContract as any);
			// Load all NFTs
			const data = await Web3Api.account.getNFTs(options as any);
			if (data?.result) {
				return Promise.all(data.result.map(resultMap));
			}
			return [];
		},
		{enabled: !!(chainId && accountAddress)},
	);
};

export default useNFTs;
