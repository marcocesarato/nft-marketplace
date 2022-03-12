import {
	AiFillBoxPlot,
	AiFillCompass,
	AiFillDashboard,
	AiFillFolderOpen,
	AiFillHome,
	AiFillShopping,
} from "react-icons/ai";

import useAccount from "./useAccount";

export default function useRoutes() {
	const {isAuthenticated} = useAccount();

	const routes = [
		{label: "Home", href: "/", icon: <AiFillHome />},
		{label: "Explore", href: "/explore", icon: <AiFillCompass />},
	];

	if (isAuthenticated) {
		routes.push(
			{label: "Dashboard", href: "/creator-dashboard", icon: <AiFillDashboard />},
			{label: "My Gallery", href: "/my-gallery", icon: <AiFillBoxPlot />},
			{label: "My Assets", href: "/my-assets", icon: <AiFillFolderOpen />},
			{label: "Sell Asset", href: "/sell", icon: <AiFillShopping />},
		);
	}

	return routes;
}
