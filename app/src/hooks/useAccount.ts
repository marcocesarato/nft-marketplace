import {useMoralis} from "react-moralis";
import axios from "axios";

import {useConfig} from "@contexts/Global";
import useWeb3 from "@hooks/useWeb3";

export default function useAccount() {
	const {
		setUserData,
		userError,
		isUserUpdating,
		isAuthenticating,
		isAuthenticated,
		authenticate,
		authError,
		logout,
		chainId,
		user,
	} = useMoralis();
	const {isLoggedSession} = useConfig();
	const {web3} = useWeb3();
	const account = web3?.provider?.["selectedAddress"]?.toLowerCase();

	// Auth signature
	const signature = user?.get("authData")?.moralisEth.signature;
	const signatureData = user?.get("authData")?.moralisEth.data;

	const doLogout = () => {
		axios.post(`${process.env.NEXT_PUBLIC_URL}/api/logout`);
		logout();
	};

	return {
		isAuthenticating,
		isLogged: isAuthenticated,
		isAuthenticated: isAuthenticated && account && web3 && isLoggedSession, // When web3 is authenticated
		logout: doLogout,
		account,
		signature,
		signatureData,
		user,
		authenticate,
		authError,
		chainId,
		setUserData,
		userError,
		isUserUpdating,
	};
}
