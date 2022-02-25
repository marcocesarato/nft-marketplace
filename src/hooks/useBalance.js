import {useConfig} from "@contexts/Global";
import {useEffect} from "react";
import {useNativeBalance} from "react-moralis";

const useBalance = () => {
	const {addConfig} = useConfig();
	const balance = useNativeBalance();

	useEffect(() => {
		addConfig({nativeToken: balance?.nativeToken});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [balance?.nativeToken]);

	return balance;
};

export default useBalance;
