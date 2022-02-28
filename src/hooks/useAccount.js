import {useMoralis} from "react-moralis";
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
		web3,
		chainId,
		enableWeb3,
		user,
	} = useMoralis();
	const account = web3?.provider?.selectedAddress;

	let username = user?.get("username") || account;
	username = username?.length > 15 ? formatAddress(account) : username;

	return {
		isAuthenticating,
		isAuthenticated: isAuthenticated && account && web3,
		provider: web3,
		account,
		username: username,
		user,
		enableWeb3,
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
