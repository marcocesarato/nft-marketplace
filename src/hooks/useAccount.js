import {useMoralis} from "react-moralis";

export default function useAccount() {
	const {
		isAuthenticated,
		authenticate,
		login,
		authError,
		signup,
		logout,
		web3,
		chainId,
		enableWeb3,
		user,
	} = useMoralis();
	const account = user?.get("ethAddress");
	return {
		isAuthenticated: isAuthenticated && account && web3,
		provider: web3,
		account,
		user,
		enableWeb3,
		authenticate,
		login,
		signup,
		authError,
		logout,
		chainId,
	};
}
