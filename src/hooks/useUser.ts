import {useEffect, useMemo} from "react";

import useAccount from "@hooks/useAccount";
import {useUserLazyQuery} from "@services/graphql";
import {formatAddress} from "@utils/formatters";

export default function useUser() {
	const {account} = useAccount();
	const [getUserLazy, {data: userData, loading: isLoadingUser, error}] = useUserLazyQuery();

	let username = useMemo(() => {
		if (isLoadingUser) return formatAddress(account);
		if (userData?.user?.username) return userData.user.username;
		if (error) console.error(error);
	}, [isLoadingUser, account, userData, error]);

	useEffect(() => {
		if (account) {
			getUserLazy({
				variables: {filter: {account}},
			});
		}
	}, [account, getUserLazy]);

	return {
		username,
		user: userData?.user,
		isLoading: isLoadingUser,
		getUserLazy,
	};
}
