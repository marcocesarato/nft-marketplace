import {useMoralis} from "react-moralis";

export default function useWeb3() {
	const {web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading} = useMoralis();

	return {
		web3,
		enableWeb3,
		isWeb3Enabled,
		isWeb3EnableLoading,
	};
}
