import {Suspense} from "react";
import {Wallet} from "ethers";
import {chain, configureChains, createClient, defaultChains} from "wagmi";
import {publicProvider} from "wagmi/providers/public";
import {MockConnector} from "@wagmi/core/connectors/mock";
import {I18nextProvider} from "react-i18next";
import {SessionProvider} from "next-auth/react";
import {Story} from "@storybook/react";
import {withI18next} from "storybook-addon-i18next";

import i18n from "./i18n";

import Providers from "../src/contexts/Providers";
import Container from "../src/components/Container";

import "focus-visible/dist/focus-visible";

/**
 * Global Decorator.
 */
export const GlobalDecorators = [
	withI18next({i18n, languages: {en: "English", it: "Italiano"}}),
	(Story) => {
		const mockWallet = new Wallet(
			"0x874f84bec39a17e36ba4a6b4d238ff944b4cb478cb5d5efc6e784d7bf4f2ff80",
		);

		const {chains, provider, webSocketProvider} = configureChains(defaultChains, [
			publicProvider(),
		]);

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
							chainId: chain.mainnet.id,
						},
					}),
				],
			});

		return (
			<Suspense fallback="loading...">
				<Providers web3Client={mockClient(mockWallet)}>
					<I18nextProvider i18n={i18n}>
						<SessionProvider>
							<Container
								position="absolute"
								p={4}
								left={4}
								right={4}
								borderRadius={5}>
								<Story />
							</Container>
						</SessionProvider>
					</I18nextProvider>
				</Providers>
			</Suspense>
		);
	},
];
