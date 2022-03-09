import {Suspense, useEffect, useState} from "react";
import {useMoralis} from "react-moralis";
import ssrPrepass from "react-ssr-prepass";

import Providers from "@app/Providers";
import Layout from "@components/Layout";
import Loading from "@components/Loading";
import ErrorBoundary from "@errors/ErrorBoundary";
import useAccount from "@hooks/useAccount";
import useLocalStorage from "@hooks/useLocalStorage";
import useWeb3 from "@hooks/useWeb3";

import "focus-visible/dist/focus-visible";

function Page({Component, pageProps}) {
	const {Moralis, isInitialized} = useMoralis();
	const {isLogged} = useAccount();
	const {enableWeb3, isWeb3Enabled, isWeb3EnableLoading} = useWeb3();
	const [connectorId] = useLocalStorage("connectorId");

	useEffect(() => {
		if (isLogged && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({provider: connectorId});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogged, isWeb3Enabled, connectorId]);

	useEffect(() => {
		if (isInitialized) Moralis.initPlugins();
	}, [isInitialized, Moralis]);

	return <Component {...pageProps} />;
}

function App({Component, pageProps}) {
	return (
		<Providers>
			<Layout>
				<ErrorBoundary>
					<Suspense fallback={<Loading />}>
						<Page Component={Component} pageProps={pageProps} />
					</Suspense>
				</ErrorBoundary>
			</Layout>
		</Providers>
	);
}

function SSRLoader(props) {
	const [init, setInit] = useState(false);
	useEffect(() => {
		const load = async () => {
			await ssrPrepass(<App {...props} />);
			setInit(true);
		};
		load();
	}, [props]);

	if (!init) return null;

	return <App {...props} />;
}

export default SSRLoader;
