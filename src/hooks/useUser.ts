import {useEffect, useMemo} from "react";
import {useMoralis} from "react-moralis";

import useAccount from "@hooks/useAccount";
import {useUserLazyQuery} from "@services/graphql";
import {formatAddress} from "@utils/formatters";

export default function useUser() {
	const {user} = useMoralis();
	const {account} = useAccount();
	const [getUser, {data: userQuery, loading: isLoadingUser, error}] = useUserLazyQuery();

	let username = useMemo(() => {
		if (isLoadingUser) return formatAddress(account);
		if (userQuery?.user?.username) return userQuery.user.username;
		if (error) console.log(error);
	}, [isLoadingUser, account, userQuery, error]);

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
		isLoadingUser,
		getUser,
	};
}
