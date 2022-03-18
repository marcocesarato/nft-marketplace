import {useMoralis} from "react-moralis";

import useWeb3 from "@hooks/useWeb3";
import {formatAddress} from "@utils/formatters";

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

	const signature = user?.get("authData")?.moralisEth.signature;
	let username = user?.get("username") || account;

	username = username?.length > 15 ? formatAddress(account) : username;

	return {
		isAuthenticating,
		isLogged: isAuthenticated,
		isAuthenticated: isAuthenticated && account && web3, // When web3 is authenticated
		account,
		signature,
		username: username,
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
