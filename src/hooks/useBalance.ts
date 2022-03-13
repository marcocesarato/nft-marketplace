import {useEffect} from "react";
import {useNativeBalance} from "react-moralis";

import {useConfig} from "@contexts/Global";

export default function useBalance() {
	const {setConfig} = useConfig();
	const balance = useNativeBalance();

	useEffect(() => {
		setConfig({nativeToken: balance?.nativeToken});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [balance?.nativeToken]);

	return balance;
}
