import {useMemo} from "react";

import {routes, routesAuthenticated} from "@configs/routes";

import useAccount from "./useAccount";

export default function useRoutes() {
	const {isAuthenticated} = useAccount();
	return useMemo(() => (isAuthenticated ? routesAuthenticated : routes), [isAuthenticated]);
}
