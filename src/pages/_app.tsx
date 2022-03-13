import {Suspense, useEffect, useState} from "react";
import {useMoralis} from "react-moralis";
import ssrPrepass from "react-ssr-prepass";
import {appWithTranslation} from "next-i18next";

import Providers from "@app/Providers";
import {TWeb3Provider} from "@app/types";
import Loader from "@components/Loader";
import Loading from "@components/Loading";
import ErrorBoundary from "@errors/ErrorBoundary";
import useAccount from "@hooks/useAccount";
import useLocalStorage from "@hooks/useLocalStorage";
import useWeb3 from "@hooks/useWeb3";
import MainLayout from "@layouts/Main";

import "focus-visible/dist/focus-visible";

function Page({Component, pageProps}): JSX.Element {
	const {Moralis, isInitialized} = useMoralis();
	const {isLogged, isAuthenticating} = useAccount();
	const {enableWeb3, isWeb3Enabled, isWeb3EnableLoading} = useWeb3();
	const [connectorId] = useLocalStorage<TWeb3Provider>("connectorId");

	useEffect(() => {
		if (isLogged && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({provider: connectorId});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogged, isWeb3Enabled, connectorId]);

	useEffect(() => {
		if (isInitialized) Moralis.initPlugins();
	}, [isInitialized, Moralis]);

	if (isAuthenticating || isWeb3EnableLoading) return <Loader />;

	return <Component {...pageProps} />;
}
const PageWithTranslations = appWithTranslation(Page);

function App(props): JSX.Element {
	return (
		<Providers>
			<MainLayout>
				<ErrorBoundary>
					<Suspense fallback={<Loading />}>
						<PageWithTranslations {...props} />
					</Suspense>
				</ErrorBoundary>
			</MainLayout>
		</Providers>
	);
}

function SSRLoader(props): JSX.Element {
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
