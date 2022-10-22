import {useEffect} from "react";

import useGlobalContext from "@contexts/Global";
import useAccount from "@hooks/useAccount";
import {useUserLazyQuery} from "@services/graphql";
import {formatAddress} from "@utils/formatters";

export default function useUser() {
	const {account} = useAccount();
	const [getUserLazy, {data: userData, loading: isLoadingUser, error}] = useUserLazyQuery();
	const {config, setConfig} = useGlobalContext();

	useEffect(() => {
		if (account) {
			getUserLazy({
				variables: {filter: {account}},
			});
		}
	}, [account, getUserLazy]);

	useEffect(() => {
		let username = "";
		if (isLoadingUser) username = formatAddress(account);
		if (userData?.user?.username) username = userData.user.username;
		setConfig({username});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoadingUser, account, userData, error]);

	return {
		id: userData?.user._id,
		username: config.username,
		user: userData?.user,
		isLoading: isLoadingUser,
		getUserLazy,
	};
}
