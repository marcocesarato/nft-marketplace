import {useERC20Transfers} from "react-moralis";

import {TTransaction} from "@app/types";

export default function useTransfers(): {data?: TTransaction[]; isLoading: boolean} {
	const {data, isLoading} = useERC20Transfers();

	return {data: data.result, isLoading};
}
