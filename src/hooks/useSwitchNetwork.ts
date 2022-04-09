import useWeb3 from "@hooks/useWeb3";
import {networkConfigs} from "@utils/networks";

export const useSwitchNetwork = () => {
	const {web3} = useWeb3();

	return async (chainId: string) => {
		try {
			await web3.provider.request({
				method: "wallet_switchEthereumChain",
				params: [{chainId}],
			});
		} catch (error) {
			if (error.code === 4902) {
				try {
					await web3.provider.request({
						method: "wallet_addEthereumChain",
						params: [networkConfigs[chainId] || {}],
					});
				} catch (error) {
					console.error(error.message);
				}
			}
		}
	};
};
