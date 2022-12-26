import {Suspense} from "react";
import {Wallet} from "ethers";
import {configureChains, createClient} from "wagmi";
import {publicProvider} from "wagmi/providers/public";
import {MockConnector} from "@wagmi/core/connectors/mock";
import {I18nextProvider} from "react-i18next";
import {SessionProvider} from "next-auth/react";
import {Story} from "@storybook/react";
import {withI18next} from "storybook-addon-i18next";
import {mainnet} from "@wagmi/core/chains";

import i18n from "./i18n";

import Providers from "../src/contexts/Providers";

import "focus-visible/dist/focus-visible";
import "@rainbow-me/rainbowkit/styles.css";
import {Chains} from "../src/configs/chain";

export const withMainDecorator = (Story) => {
	const mockWallet = new Wallet(
		"0x874f84bec39a17e36ba4a6b4d238ff944b4cb478cb5d5efc6e784d7bf4f2ff80",
	);

	const {chains, provider, webSocketProvider} = configureChains(Chains, [publicProvider()]);

	/**
	 * A wagmi client which provides access to the given Wallet instance.
	 */
	const mockClient = (wallet: Wallet) =>
		createClient({
			autoConnect: true,
			provider,
			webSocketProvider,
			connectors: [
				new MockConnector({
					chains,
					options: {
						signer: wallet,
						chainId: mainnet.id,
					},
				}),
			],
		});

	return (
		<Suspense fallback="loading...">
			<Providers web3Client={mockClient(mockWallet)}>
				<I18nextProvider i18n={i18n}>
					<SessionProvider>
						<Story />
					</SessionProvider>
				</I18nextProvider>
			</Providers>
		</Suspense>
	);
};

/**
 * Global Decorator.
 */
export const GlobalDecorators = [
	withI18next({i18n, languages: {en: "English", it: "Italiano"}}),
	withMainDecorator,
];
