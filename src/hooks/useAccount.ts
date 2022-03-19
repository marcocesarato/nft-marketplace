import {useMoralis} from "react-moralis";

import useWeb3 from "@hooks/useWeb3";

export default function useAccount() {
	const {
		setUserData,
		userError,
		isUserUpdating,
		isAuthenticating,
		isAuthenticated,
		authenticate,
		auth,
		login,
		authError,
		signup,
		logout,
		chainId,
		user,
	} = useMoralis();
	const {web3} = useWeb3();
	const account = web3?.provider?.["selectedAddress"];

	// Auth signature
	const signature = user?.get("authData")?.moralisEth.signature;

	return {
		isAuthenticating,
		isLogged: isAuthenticated,
		isAuthenticated: isAuthenticated && account && web3, // When web3 is authenticated
		account,
		signature,
		user,
		auth,
		authenticate,
		login,
		signup,
		authError,
		logout,
		chainId,
		setUserData,
		userError,
		isUserUpdating,
	};
}
