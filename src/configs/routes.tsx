import {
	AiFillBoxPlot,
	AiFillCompass,
	AiFillDashboard,
	AiFillFolderOpen,
	AiFillHome,
	AiFillShopping,
} from "react-icons/ai";

export const routes = [
	{label: "Home", href: "/", icon: <AiFillHome />},
	{label: "Explore", href: "/explore", icon: <AiFillCompass />},
];

export const routesAuthenticated = [
	...routes,
	{label: "Dashboard", href: "/creator-dashboard", icon: <AiFillDashboard />},
	{label: "My Gallery", href: "/my-gallery", icon: <AiFillBoxPlot />},
	{label: "My Assets", href: "/my-assets", icon: <AiFillFolderOpen />},
	{label: "Sell Asset", href: "/sell", icon: <AiFillShopping />},
];
