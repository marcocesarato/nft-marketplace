import {useMemo} from "react";

import {routes, routesAuthenticated} from "@configs/routes";

import useAccount from "./useAccount";

export default function useRoutes() {
	const {isLogged} = useAccount();
	return useMemo(() => (isLogged ? routesAuthenticated : routes), [isLogged]);
}
