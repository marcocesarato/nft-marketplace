import {useMemo} from "react";

import {
	routes,
	routesAuthenticated,
	routesMobile,
	routesMobileAuthenticated,
} from "@configs/routes";

import useAccount from "./useAccount";

export function useRoutes() {
	const {isAuthenticated} = useAccount();
	return useMemo(() => (isAuthenticated ? routesAuthenticated : routes), [isAuthenticated]);
}

export function useMobileRoutes() {
	const {isAuthenticated} = useAccount();
	return useMemo(
		() => (isAuthenticated ? routesMobileAuthenticated : routesMobile),
		[isAuthenticated],
	);
}

export default useRoutes;
