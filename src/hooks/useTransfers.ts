import {useERC20Transfers} from "react-moralis";

import {TTransfers} from "@app/types";

export default function useTransfers(): {data?: TTransfers[]; isLoading: boolean} {
	const {data, isLoading} = useERC20Transfers();

	return {data: data?.result, isLoading};
}
