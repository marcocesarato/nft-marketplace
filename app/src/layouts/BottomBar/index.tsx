import {useCallback, useMemo} from "react";
import {AiOutlineMenu} from "react-icons/ai";
import {useRouter} from "next/router";
import {As, Box} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {useMenu} from "@contexts/Global";
import {useMobileRoutes} from "@hooks/useRoutes";
import {getPath} from "@utils/url";

import {BottomNavigation} from "./BottomNavigation";
import {BottomNavigationIcon} from "./BottomNavigationIcon";
import {BottomNavigationItem} from "./BottomNavigationItem";
import {BottomNavigationLabel} from "./BottomNavigationLabel";

export default function BottomNavigationBar(props): JSX.Element {
	const router = useRouter();
	const {onToggleMenu} = useMenu();
	const routes = useMobileRoutes();
	const {t} = useTranslation();

	const Content = useMemo(() => {
		return (): JSX.Element => (
			<>
				{routes.map(({label, href, icon}, key) => (
					<BottomNavigationItem value={href} key={key}>
						<BottomNavigationIcon as={icon as As<any>} />
						<BottomNavigationLabel>{t<string>(label)}</BottomNavigationLabel>
					</BottomNavigationItem>
				))}
			</>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [routes]);

	const handleChange = useCallback(
		(value) => {
			if (value === "menu") {
				onToggleMenu();
			} else {
				router.push(value);
			}
		},
		[router, onToggleMenu],
	);
	return (
		<>
			<BottomNavigation
				{...props}
				value={getPath(router?.asPath)}
				showLabel="never"
				onChange={handleChange}>
				<Content />
				<BottomNavigationItem value="menu">
					<BottomNavigationIcon as={AiOutlineMenu} />
					<BottomNavigationLabel>
						{t<string>("common:action.openMenu")}
					</BottomNavigationLabel>
				</BottomNavigationItem>
			</BottomNavigation>
			<Box {...props} height="115px" />
		</>
	);
}
