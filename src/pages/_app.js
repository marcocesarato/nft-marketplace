import "focus-visible/dist/focus-visible";
import {useEffect} from "react";
import {useMoralis} from "react-moralis";
import Providers from "@app/Providers";
import Layout from "@components/Layout";
import ErrorBoundary from "@errors/ErrorBoundary";

function Page({Component, pageProps}) {
	const {isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading} = useMoralis();
	useEffect(() => {
		const connectorId = window.localStorage.getItem("connectorId");
		if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
			enableWeb3({provider: connectorId});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isWeb3Enabled]);

	return <Component {...pageProps} />;
}

function App({Component, pageProps}) {
	return (
		<Providers>
			<Layout>
				<ErrorBoundary>
					<Page Component={Component} pageProps={pageProps} />
				</ErrorBoundary>
			</Layout>
		</Providers>
	);
}

export default App;
