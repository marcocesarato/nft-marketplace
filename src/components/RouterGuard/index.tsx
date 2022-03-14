import {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/router";

import {publicPaths} from "@configs/routes";
import useAccount from "@hooks/useAccount";

export default function RouterGuard({children}: {children: ReactNode}): JSX.Element {
	const router = useRouter();
	const {isAuthenticated} = useAccount();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		const path = router.asPath.split("?")[0];
		if (!isAuthenticated && !publicPaths.includes(path) && !router.isFallback) {
			setAuthorized(false);
			router.push({
				pathname: "/",
				query: {returnUrl: router.asPath},
			});
		} else {
			setAuthorized(true);
		}
	}, [isAuthenticated, router]);

	return <>{authorized && children}</>;
}
