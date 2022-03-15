import {Suspense, useEffect, useState} from "react";
import {useMoralis} from "react-moralis";
import ssrPrepass from "react-ssr-prepass";
import {appWithTranslation} from "next-i18next";

import Providers from "@app/Providers";
import {TWeb3Provider} from "@app/types";
import Loader from "@components/Loader";
import Loading from "@components/Loading";
import RouteGuard from "@components/RouterGuard";
import ErrorBoundary from "@errors/ErrorBoundary";
import useAccount from "@hooks/useAccount";
import useLocalStorage from "@hooks/useLocalStorage";
import useWeb3 from "@hooks/useWeb3";
import MainLayout from "@layouts/Main";

import "focus-visible/dist/focus-visible";

function Page({Component, pageProps}): JSX.Element {
	const {Moralis, isInitialized, isInitializing} = useMoralis();
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

	if (isAuthenticating || isWeb3EnableLoading || isInitializing) return <Loader />;

	return (
		<RouteGuard>
			<Component {...pageProps} />
		</RouteGuard>
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
