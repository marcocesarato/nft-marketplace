/* eslint-disable no-restricted-globals */
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import {setCookie} from "cookies-next";
import {SessionProvider} from "next-auth/react";
import {appWithTranslation} from "next-i18next";
import {useNetwork} from "wagmi";

import Loader from "@components/Loader";
import Providers from "@contexts/Providers";
import ErrorBoundary from "@errors/ErrorBoundary";
import useAccount from "@hooks/useAccount";
import MainLayout from "@layouts/Main";

import "focus-visible/dist/focus-visible";

import "@rainbow-me/rainbowkit/styles.css";

dynamic(() => import("webxr-polyfill"), {ssr: false});

function Page({Component, pageProps: {session, ...pageProps}}): JSX.Element {
	const [mounted, setMounted] = useState(false);
	const {isConnecting} = useAccount();
	const {chain} = useNetwork();

	useEffect(() => setMounted(true), []);
	useEffect(() => setCookie("chain", chain), [chain]);
	if (!mounted) return null;

	return (
		<>
			<Head>
				<title>NFT Marketplace</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<SessionProvider session={session} refetchInterval={0}>
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
