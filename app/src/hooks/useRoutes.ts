import {useMemo} from "react";

import {
	routes,
	routesAuthenticated,
	routesMobile,
	routesMobileAuthenticated,
} from "@configs/routes";

import useAccount from "./useAccount";

export function useRoutes() {
	const {isConnected} = useAccount();
	return useMemo(() => (isConnected ? routesAuthenticated : routes), [isConnected]);
}

export function useMobileRoutes() {
	const {isConnected} = useAccount();
	return useMemo(() => (isConnected ? routesMobileAuthenticated : routesMobile), [isConnected]);
}

export default useRoutes;
