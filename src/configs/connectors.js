import Metamask from "@assets/walletIcons/MetaMask.svg";
import Coin98 from "@assets/walletIcons/Coin98.svg";
import WalletConnect from "@assets/walletIcons/WalletConnect.svg";
import MathWallet from "@assets/walletIcons/MathWallet.svg";
import TokenPocket from "@assets/walletIcons/TokenPocket.svg";
import SafePal from "@assets/walletIcons/SafePal.svg";
import TrustWallet from "@assets/walletIcons/TrustWallet.svg";
import Others from "@assets/walletIcons/Others.svg";

export const connectors = [
	{
		title: "Metamask",
		icon: Metamask,
		connectorId: "injected",
		priority: 1,
	},
	{
		title: "WalletConnect",
		icon: WalletConnect,
		connectorId: "walletconnect",
		priority: 2,
	},
	{
		title: "Trust Wallet",
		icon: TrustWallet,
		connectorId: "injected",
		priority: 3,
	},
	{
		title: "MathWallet",
		icon: MathWallet,
		connectorId: "injected",
		priority: 999,
	},
	{
		title: "TokenPocket",
		icon: TokenPocket,
		connectorId: "injected",
		priority: 999,
	},
	{
		title: "SafePal",
		icon: SafePal,
		connectorId: "injected",
		priority: 999,
	},
	{
		title: "Coin98",
		icon: Coin98,
		connectorId: "injected",
		priority: 999,
	},
	{
		title: "Others",
		icon: Others,
		connectorId: "injected",
		priority: 999,
	},
];
