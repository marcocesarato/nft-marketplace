import {useQuery} from "react-query";
import {useAccount, useNetwork} from "wagmi";

import type {TokenItem} from "@app/types";
import {useData} from "@contexts/Global";
import {isString} from "@utils/objects";

import useIPFS from "./useIPFS";
import useNFTMetadata from "./useNFTMetadata";

const useNFTs = ({address = null} = {}) => {
	const {chain} = useNetwork();
	const {address: account} = useAccount();
	const {userNFTs, accountsNFTs} = useData();
	//const {withMetadata} = useNFTMetadata();
	const {resolveLink} = useIPFS();
	const resultMap = async (nft) => {
		/*if (!nft?.metadata) {
			nft = await withMetadata(nft);
		}*/
		if (nft?.metadata) {
			if (isString(nft.metadata)) nft.metadata = JSON.parse(nft.metadata);
			if (typeof nft.metadata === "object") {
				if (nft.metadata["data"]) nft.metadata = nft.metadata["data"];
				if (nft.metadata["image"])
					nft.metadata["image"] = resolveLink(nft.metadata["image"]);
			}
			nft.metadata = {...nft, ...nft.metadata};
		}
		return nft;
	};
	const source =
		address && (account.toLowerCase() !== address.toLowerCase() || !userNFTs?.length)
			? accountsNFTs[address] || []
			: userNFTs || [];
	return useQuery<TokenItem[], Error>(
		["getNFTs" + (address ?? ""), source?.length, chain],
		async () => {
			if (source) {
				return Promise.all(source.map(resultMap));
			}
			return [];
		},
		{enabled: !!source},
	);
};

export default useNFTs;
