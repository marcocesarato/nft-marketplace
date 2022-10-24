/* eslint-disable no-restricted-globals */
import {lazy, useEffect} from "react";
import {useMoralis} from "react-moralis";
import Head from "next/head";
import {appWithTranslation} from "next-i18next";

import Providers from "@app/Providers";
import type {TWeb3Provider} from "@app/types";
import Loader from "@components/Loader";
import {ChainId} from "@configs/chain";
import {useConfig} from "@contexts/Global";
import ErrorBoundary from "@errors/ErrorBoundary";
import useAccount from "@hooks/useAccount";
import useLocalStorage from "@hooks/useLocalStorage";
import {useSwitchNetwork} from "@hooks/useSwitchNetwork";
import useWeb3 from "@hooks/useWeb3";
import MainLayout from "@layouts/Main";

import "focus-visible/dist/focus-visible";

lazy(() => import("webxr-polyfill"));

function Page({Component, pageProps}): JSX.Element {
	const {Moralis, isInitialized} = useMoralis();
	const {isAuthenticated, isAuthenticating} = useAccount();
	const {enableWeb3, isWeb3Enabled, isWeb3EnableLoading} = useWeb3();
	const {setConfig} = useConfig();
	const switchNetwork = useSwitchNetwork();
	const [connectorId] = useLocalStorage<TWeb3Provider>("connectorId");

	const loadWeb3 = async () => {
		await enableWeb3();
		await switchNetwork(ChainId);
	};

	useEffect(() => {
		if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
			loadWeb3();
			setConfig({isLogged: pageProps.isLogged});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isWeb3Enabled, connectorId, pageProps.isLogged]);

	useEffect(() => {
		if (isInitialized) Moralis.initPlugins();
	}, [isInitialized, Moralis]);

	return (
		<>
			<Head>
				<title>NFT Marketplace</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<MainLayout>
				<ErrorBoundary>
					{isWeb3EnableLoading || isAuthenticating ? (
						<Loader
							message={
								isAuthenticating
									? "Authenticating..."
									: isWeb3EnableLoading
									? "Connecting to the wallet..."
									: null
							}
						/>
					) : (
						<Component {...pageProps} />
					)}
				</ErrorBoundary>
			</MainLayout>
		</>
	);
}

function App(props): JSX.Element {
	useEffect(() => {
		if (process.env.NODE_ENV === "production") {
			if (
				location.hostname !== "localhost" &&
				location.hostname !== "127.0.0.1" &&
				window.location.protocol === "http:"
			) {
				window.location.protocol = "https:";
			}
		}
	}, []);

	return (
		<Providers>
			<Page {...props} />
		</Providers>
	);
}

const AppWithTranslations = appWithTranslation(App);
export default AppWithTranslations;
