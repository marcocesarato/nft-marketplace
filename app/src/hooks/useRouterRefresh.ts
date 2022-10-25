import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function useRouterRefresh(props: any = null): {
	refresh: () => void;
	isRefreshing: boolean;
} {
	const router = useRouter();
	const [isRefreshing, setIsRefreshing] = useState(false);
	const {asPath} = router;

	useEffect(() => {
		setIsRefreshing(false);
	}, [props]);

	const refresh = useCallback(() => {
		router.replace(asPath);
		setIsRefreshing(true);
	}, [router, asPath]);

	return {refresh, isRefreshing};
}
