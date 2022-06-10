import {useERC20Transfers} from "react-moralis";

import type {TokenTransfer} from "@app/types";

export default function useTransfers(): {data?: TokenTransfer[]; isLoading: boolean} {
	const {data, isLoading} = useERC20Transfers();

	return {data: data?.result, isLoading};
}
