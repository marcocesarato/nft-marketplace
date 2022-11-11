import {useEffect, useMemo} from "react";
import {useAccount, useBalance} from "wagmi";

import {useConfig} from "@contexts/Global";
import {formatBalance} from "@utils/formatters";

export default function useNativeBalance() {
	const {address} = useAccount();
	const {setConfig} = useConfig();
	const {data, isError, isLoading} = useBalance({
		address: address,
	});

	const display = useMemo(() => {
		const ethBalance = data?.formatted;
		const displayBalance = ethBalance ? formatBalance(parseFloat(ethBalance)) : 0;
		return `${displayBalance} ${data?.symbol || ""}`;
	}, [data]);

	useEffect(() => {
		setConfig({symbol: data?.symbol});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data?.symbol]);

	return {data, display, isError, isLoading};
}
