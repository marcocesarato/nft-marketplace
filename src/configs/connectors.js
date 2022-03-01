import Metamask from "@assets/svg/wallets/MetaMask.svg";
import WalletConnect from "@assets/svg/wallets/WalletConnect.svg";

export const connectors = [
	{
		title: "Metamask",
		subititle: "Connect to your Metamask wallet",
		icon: Metamask,
		connectorId: "injected",
		priority: 1,
	},
	{
		title: "WalletConnect",
		subititle: "Scan with WalletConnect to connect",
		icon: WalletConnect,
		connectorId: "walletconnect",
		priority: 2,
	},
];
