import {useERC20Transfers} from "react-moralis";

export default function useTransfers() {
	const {data, isLoading} = useERC20Transfers();

	return {data, isLoading};
}
