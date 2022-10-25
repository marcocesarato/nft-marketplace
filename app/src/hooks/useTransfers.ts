import {useQuery} from "react-query";
import {useAccount, useNetwork} from "wagmi";

import type {TokenTransfer} from "@app/types";
import {useData} from "@contexts/Global";

export default function useTransfers({address = null} = {}): {
	data?: TokenTransfer[];
	isLoading: boolean;
} {
	const {address: account} = useAccount();
	const {chain} = useNetwork();
	const {userTransfersERC20, accountsNFTs} = useData();

	const source =
		address && (account.toLowerCase() !== address.toLowerCase() || !userTransfersERC20?.length)
			? accountsNFTs[address] || []
			: userTransfersERC20 || [];
	return useQuery(
		["getTransfersERC20" + (address ?? ""), source?.length, chain],
		async () => {
			return source;
		},
		{enabled: !!source},
	);
}
