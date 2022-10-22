import {useERC20Transfers} from "react-moralis";

import type {TokenTransfer} from "@app/types";

export default function useTransfers(options = null): {
	data?: TokenTransfer[];
	isLoading: boolean;
} {
	const {data, isLoading} = useERC20Transfers(options);

	return {data: data?.result, isLoading};
}
