import {useEffect} from "react";
import {useAccount, useBalance} from "wagmi";

import {useConfig} from "@contexts/Global";

export default function useNativeBalance() {
	const {address} = useAccount();
	const {setConfig} = useConfig();
	const {data, isError, isLoading} = useBalance({
		addressOrName: address,
	});

	useEffect(() => {
		setConfig({symbol: data?.symbol});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.symbol]);

	return {data, isError, isLoading};
}
