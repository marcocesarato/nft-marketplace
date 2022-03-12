import {TWeb3Provider} from "@app/types";
import Metamask from "@assets/svg/wallets/MetaMask.svg";
import WalletConnect from "@assets/svg/wallets/WalletConnect.svg";

export const connectors = [
	{
		title: "Metamask",
		subititle: "Connect to your Metamask wallet",
		icon: Metamask,
		connectorId: "metamask" as TWeb3Provider,
		priority: 1,
	},
	{
		title: "WalletConnect",
		subititle: "Scan with WalletConnect to connect",
		icon: WalletConnect,
		connectorId: "walletconnect" as TWeb3Provider,
		priority: 2,
	},
];
