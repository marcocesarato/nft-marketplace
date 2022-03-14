import {useERC20Transfers} from "react-moralis";

import {MarketTransfers} from "@app/types";

export default function useTransfers(): {data?: MarketTransfers[]; isLoading: boolean} {
	const {data, isLoading} = useERC20Transfers();

	return {data: data?.result, isLoading};
}
