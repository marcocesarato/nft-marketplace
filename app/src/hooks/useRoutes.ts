import {useMemo} from "react";

import {
	routes,
	routesAuthenticated,
	routesMobile,
	routesMobileAuthenticated,
} from "@configs/routes";

import useAccount from "./useAccount";

export function useRoutes() {
	const {isFullAuthenticated} = useAccount();
	return useMemo(
		() => (isFullAuthenticated ? routesAuthenticated : routes),
		[isFullAuthenticated],
	);
}

export function useMobileRoutes() {
	const {isFullAuthenticated} = useAccount();
	return useMemo(
		() => (isFullAuthenticated ? routesMobileAuthenticated : routesMobile),
		[isFullAuthenticated],
	);
}

export default useRoutes;
