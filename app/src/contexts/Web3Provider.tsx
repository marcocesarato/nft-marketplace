import {useColorModeValue} from "@chakra-ui/react";
import {
	darkTheme,
	getDefaultWallets,
	lightTheme,
	RainbowKitProvider,
	Theme,
} from "@rainbow-me/rainbowkit";
import {chain, configureChains, createClient, defaultChains, WagmiConfig} from "wagmi";
import {publicProvider} from "wagmi/providers/public";

const appName = "NFT Marketplace";

const customChains =
	process.env.NODE_ENV !== "production"
		? [chain.polygonMumbai, chain.ropsten, ...defaultChains]
		: [chain.polygon, ...defaultChains];

const {provider, webSocketProvider, chains} = configureChains(customChains, [publicProvider()]);
const {connectors} = getDefaultWallets({
	appName,
	chains,
});
const client = createClient({
	provider,
	webSocketProvider,
	autoConnect: true,
	connectors,
});

function Web3Provider({children}): JSX.Element {
	const mainTheme = useColorModeValue(lightTheme, darkTheme);
	const rainbowTheme: Theme = {
		...mainTheme(),
		shadows: {
			connectButton: "none",
			dialog: "none",
			profileDetailsAction: "none",
			selectedOption: "none",
			selectedWallet: "none",
			walletLogo: "none",
		},
	};
	return (
		<WagmiConfig client={client}>
			<RainbowKitProvider
				appInfo={{appName}}
				chains={chains}
				coolMode
				theme={rainbowTheme}
				modalSize="wide">
				{children}
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default Web3Provider;
