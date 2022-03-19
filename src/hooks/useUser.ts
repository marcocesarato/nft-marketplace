import {useEffect, useMemo} from "react";
import {useMoralis} from "react-moralis";

import useWeb3 from "@hooks/useWeb3";
import {useUserLazyQuery} from "@services/graphql";
import {formatAddress} from "@utils/formatters";

export default function useUser() {
	const {user} = useMoralis();
	const {web3} = useWeb3();
	const account = web3?.provider?.["selectedAddress"];
	const [getUser, {data: userQuery, loading: isLoadingUser}] = useUserLazyQuery();
	let username = useMemo(() => {
		if (isLoadingUser) return formatAddress(account);
		if (userQuery?.user?.username) return userQuery.user.username;
	}, [isLoadingUser, account, userQuery]);

	useEffect(() => {
		if (account) {
			getUser({
				variables: {filter: {account}},
			});
		}
	}, [account, getUser]);

	return {
		username,
		user,
	};
}
