import {Suspense, useEffect, useState} from "react";
import {useMoralis} from "react-moralis";
import ssrPrepass from "react-ssr-prepass";
import dynamic from "next/dynamic";
import Head from "next/head";
import {appWithTranslation} from "next-i18next";

import Providers from "@app/Providers";
import type {TWeb3Provider} from "@app/types";
import Loader from "@components/Loader";
import Loading from "@components/Loading";
import ErrorBoundary from "@errors/ErrorBoundary";
import useAccount from "@hooks/useAccount";
import useLocalStorage from "@hooks/useLocalStorage";
import useWeb3 from "@hooks/useWeb3";
import MainLayout from "@layouts/Main";

import "focus-visible/dist/focus-visible";

const WebXRPolyfill = dynamic(() => import("webxr-polyfill"), {ssr: false});

function Page({Component, pageProps}): JSX.Element {
	const {Moralis, isInitialized, isInitializing} = useMoralis();
	const {isLogged, isAuthenticating} = useAccount();
	const {enableWeb3, isWeb3Enabled, isWeb3EnableLoading} = useWeb3();
	const [connectorId] = useLocalStorage<TWeb3Provider>("connectorId");

	// Polyfills
	useEffect(() => {
		try {
			// @ts-ignore
			new WebXRPolyfill();
		} catch (e) {
			console.error(e);
		}
	}, []);

	useEffect(() => {
		if (isLogged && !isWeb3Enabled && !isWeb3EnableLoading) {
			enableWeb3();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogged, isWeb3Enabled, connectorId]);

	useEffect(() => {
		if (isInitialized) Moralis.initPlugins();
	}, [isInitialized, Moralis]);

	if (isAuthenticating) return <Loader message="Check for athentication on your wallet..." />;
	if (isWeb3EnableLoading || isInitializing) return <Loader message="Loading..." />;

	return (
		<>
			<Head>
				<title>NFT Marketplace</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}
function App(props): JSX.Element {
	return (
		<Providers>
			<MainLayout>
				<ErrorBoundary>
					<Suspense fallback={<Loading />}>
						<Page {...props} />
					</Suspense>
				</ErrorBoundary>
			</MainLayout>
		</Providers>
	);
}

const AppWithTranslations = appWithTranslation(App);

function SSRLoader(props): JSX.Element {
	const [init, setInit] = useState(false);
	useEffect(() => {
		const load = async () => {
			await ssrPrepass(<AppWithTranslations {...props} />);
			setInit(true);
		};
		load();
	}, [props]);

	if (!init) return null;
	return <AppWithTranslations {...props} />;
}

export default SSRLoader;
