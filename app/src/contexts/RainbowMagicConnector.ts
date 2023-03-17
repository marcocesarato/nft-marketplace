import {MagicConnectConnector} from "@everipedia/wagmi-magic-connector";
import {Wallet} from "@rainbow-me/rainbowkit/dist/wallets/Wallet";

export const rainbowMagicConnector = ({chains}: any): Wallet => ({
	id: "magic",
	name: "Magic",
	iconUrl: "https://svgshare.com/i/iJK.svg",
	iconBackground: "#fff",
	createConnector: () => {
		const connector = new MagicConnectConnector({
			chains: chains,
			options: {
				apiKey: process.env.NEXT_PUBLIC_MAGICLINK_API_KEY,
				magicSdkConfiguration: {
					network: {
						// your ethereum, polygon, or optimism mainnet/testnet rpc URL
						rpcUrl: "https://polygon-rpc.com",
						chainId: 137,
					},
				},
				accentColor: "#9461e3",
			},
		}) as any;
		return {
			connector,
		};
	},
});
