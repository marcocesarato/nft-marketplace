import {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/router";

import {publicPaths} from "@configs/routes";
import useAccount from "@hooks/useAccount";
import {getPath} from "@utils/url";

export default function RouterGuard({children}: {children: ReactNode}): JSX.Element {
	const router = useRouter();
	const {isAuthenticated, isAuthenticating} = useAccount();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		const path = getPath(router?.asPath);
		if (!isAuthenticated && !publicPaths.includes(path) && !router?.isFallback) {
			setAuthorized(false);
			if (!isAuthenticating)
				router.push({
					pathname: "/",
					query: {return: router.asPath},
				});
		} else {
			setAuthorized(true);
			if (!isAuthenticating && router?.query.returnUrl) {
				router.push(router.query.return as string);
			}
		}
	}, [isAuthenticated, isAuthenticating, router]);

	return <>{authorized && children}</>;
}
