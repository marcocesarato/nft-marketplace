/* eslint-disable no-restricted-globals */
import {lazy, useEffect, useState} from "react";
import Head from "next/head";
import {setCookie} from "cookies-next";
import {SessionProvider} from "next-auth/react";
import {appWithTranslation} from "next-i18next";
import {useNetwork} from "wagmi";

import Loader from "@components/Loader";
import {useData} from "@contexts/Global";
import Providers from "@contexts/Providers";
import ErrorBoundary from "@errors/ErrorBoundary";
import useAccount from "@hooks/useAccount";
import MainLayout from "@layouts/Main";

import "focus-visible/dist/focus-visible";

import "@rainbow-me/rainbowkit/styles.css";

lazy(() => import("webxr-polyfill"));

function Page({Component, pageProps}): JSX.Element {
	const [mounted, setMounted] = useState(false);
	const {isConnected, isConnecting} = useAccount();
	const {chain} = useNetwork();
	const {mergeData} = useData();

	useEffect(() => setMounted(true), []);
	useEffect(() => setCookie("chain", chain), [chain]);
	useEffect(() => {
		if (isConnected) mergeData(pageProps.data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isConnected, pageProps]);

	if (!mounted) return null;

	return (
		<>
			<Head>
				<title>NFT Marketplace</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<SessionProvider session={pageProps.session} refetchInterval={0}>
				<MainLayout>
					<ErrorBoundary>
						{isConnecting ? <Loader /> : <Component {...pageProps} />}
					</ErrorBoundary>
				</MainLayout>
			</SessionProvider>
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
