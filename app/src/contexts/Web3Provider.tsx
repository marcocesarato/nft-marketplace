import {useColorModeValue, useToken} from "@chakra-ui/react";
import {
	darkTheme,
	getDefaultWallets,
	lightTheme,
	RainbowKitProvider,
	Theme,
} from "@rainbow-me/rainbowkit";
import {allChains, chain, configureChains, createClient, defaultChains, WagmiConfig} from "wagmi";
//import {alchemyProvider} from "wagmi/providers/alchemy";
import {publicProvider} from "wagmi/providers/public";

import Avatar from "@components/Avatar";
import {deepMerge} from "@utils/objects";

const appName = "NFT MarketVerse";

const selectedChains =
	process.env.NODE_ENV !== "production"
		? allChains
		: [...defaultChains, chain.polygon, chain.polygonMumbai, chain.optimism, chain.arbitrum];

const {provider, webSocketProvider, chains} = configureChains(selectedChains, [
	//alchemyProvider({apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, priority: 0, weight: 1}),
	publicProvider({priority: 1, weight: 2}),
]);
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
	const [primary, whiteAlpha800, whiteAlpha200, black, white] = useToken("colors", [
		"primary",
		"whiteAlpha.800",
		"whiteAlpha.200",
		"black",
		"white",
	]);
	const mainTheme = useColorModeValue(lightTheme, darkTheme);
	const connectButtonBackground = useColorModeValue(whiteAlpha800, whiteAlpha200);
	const accentColorForeground = useColorModeValue(white, black);
	const rainbowTheme: Theme = deepMerge(
		mainTheme({accentColor: primary, accentColorForeground}),
		{
			colors: {
				connectButtonBackground,
				connectButtonInnerBackground: "none",
			},
			fonts: {
				body: "'Euclid Circular',sans-serif",
			},
			shadows: {
				connectButton: "none",
				dialog: "none",
				profileDetailsAction: "none",
				selectedOption: "none",
				selectedWallet: "none",
				walletLogo: "none",
			},
		},
	) as Theme;
	return (
		<WagmiConfig client={client}>
			<RainbowKitProvider
				chains={chains}
				coolMode
				theme={rainbowTheme}
				modalSize="wide"
				avatar={Avatar}>
				{children}
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default Web3Provider;
