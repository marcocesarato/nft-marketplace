import {useCallback, useMemo} from "react";
import {useRouter} from "next/router";
import {As, Box} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {useMobileRoutes} from "@hooks/useRoutes";
import {getPath} from "@utils/url";

import {BottomNavigation} from "./BottomNavigation";
import {BottomNavigationIcon} from "./BottomNavigationIcon";
import {BottomNavigationItem} from "./BottomNavigationItem";
import {BottomNavigationLabel} from "./BottomNavigationLabel";

export default function BottomNavigationBar(props): JSX.Element {
	const router = useRouter();
	const routes = useMobileRoutes();
	const {t} = useTranslation();

	const Content = useMemo(() => {
		return (): JSX.Element => (
			<>
				{routes.map(({label, href, icon}, key) => (
					<BottomNavigationItem value={href} key={key}>
						<BottomNavigationIcon as={icon as As<any>} />
						<BottomNavigationLabel>{t(label)}</BottomNavigationLabel>
					</BottomNavigationItem>
				))}
			</>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [routes]);

	const handleChange = useCallback(
		(path) => {
			router.push(path);
		},
		[router],
	);
	return (
		<>
			<BottomNavigation
				{...props}
				value={getPath(router?.asPath)}
				showLabel="never"
				onChange={handleChange}>
				<Content />
			</BottomNavigation>
			<Box {...props} height="115px" />
		</>
	);
}
