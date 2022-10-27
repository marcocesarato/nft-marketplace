import {useColorModeValue, useToken} from "@chakra-ui/react";
import {
	darkTheme,
	getDefaultWallets,
	lightTheme,
	RainbowKitProvider,
	Theme,
} from "@rainbow-me/rainbowkit";
import {allChains, configureChains, createClient, WagmiConfig} from "wagmi";
import {publicProvider} from "wagmi/providers/public";

import Avatar from "@components/Avatar";
import {deepMerge} from "@utils/objects";

const appName = "NFT Marketplace";

const {provider, webSocketProvider, chains} = configureChains(allChains, [publicProvider()]);
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
