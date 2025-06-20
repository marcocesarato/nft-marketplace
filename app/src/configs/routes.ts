import {
	AiFillBoxPlot,
	AiFillCalendar,
	AiFillCompass,
	AiFillDashboard,
	AiFillFolderOpen,
	AiFillHome,
	AiFillShopping,
} from "react-icons/ai";

export const publicPaths = ["/", "/explore"];

// Navigation

export const routes = [
	{label: "common:page.home.shortTitle", href: "/", icon: AiFillHome},
	{label: "common:page.explore.shortTitle", href: "/explore", icon: AiFillCompass},
];

export const routesAuthenticated = [
	...routes,
	{
		label: "common:page.dashboard.shortTitle",
		href: "/creator-dashboard",
		icon: AiFillDashboard,
	},
	{label: "common:page.gallery.shortTitle", href: "/gallery", icon: AiFillBoxPlot},
	{label: "common:page.assets.shortTitle", href: "/assets", icon: AiFillFolderOpen},
	{label: "common:page.events.shortTitle", href: "/events", icon: AiFillCalendar},
	{label: "common:page.sell.shortTitle", href: "/sell", icon: AiFillShopping},
];

// Mobile bottom bar

export const routesMobile = [
	{label: "common:page.home.shortTitle", href: "/", icon: AiFillHome},
	{label: "common:page.explore.shortTitle", href: "/explore", icon: AiFillCompass},
];

export const routesMobileAuthenticated = [
	...routesMobile,
	{label: "common:page.gallery.shortTitle", href: "/gallery", icon: AiFillBoxPlot},
	{label: "common:page.assets.shortTitle", href: "/assets", icon: AiFillFolderOpen},
];
