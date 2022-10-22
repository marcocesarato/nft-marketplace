import useWeb3 from "@hooks/useWeb3";
import {networkConfigs} from "@utils/networks";

export const useSwitchNetwork = () => {
	const {web3, enableWeb3} = useWeb3();
	return async (chainId: string) => {
		// @ts-ignore
		const provider = web3?.currentProvider || (await enableWeb3())?.provider;
		try {
			await provider.request({
				method: "wallet_switchEthereumChain",
				params: [{chainId}],
			});
		} catch (error) {
			if (error.code === 4902) {
				try {
					await provider.request({
						method: "wallet_addEthereumChain",
						params: [networkConfigs[chainId] || {}],
					});
				} catch (e) {
					console.error(e.message);
				}
			} else {
				console.error(error.message);
			}
		}
	};
};
