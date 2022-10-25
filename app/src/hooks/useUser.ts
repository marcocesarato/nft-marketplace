import {useEffect} from "react";

import {useConfig} from "@contexts/Global";
import useAccount from "@hooks/useAccount";
import {useUserLazyQuery} from "@services/graphql";
import {formatAddress} from "@utils/formatters";

export default function useUser() {
	const {address} = useAccount();
	const [getUserLazy, {data: userData, loading: isLoadingUser, error}] = useUserLazyQuery();
	const {username, setConfig} = useConfig();

	useEffect(() => {
		if (address) {
			getUserLazy({
				variables: {filter: {account: address}},
			});
		}
	}, [address, getUserLazy]);

	useEffect(() => {
		let user = "";
		if (isLoadingUser) user = formatAddress(address);
		if (userData?.user?.username) user = userData.user.username;
		setConfig({username: user});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoadingUser, address, userData, error]);

	return {
		id: userData?.user._id,
		username: username,
		user: userData?.user,
		isLoading: isLoadingUser,
		getUserLazy,
	};
}
