import {Box} from "@chakra-ui/react";

import Viewport from "@components/Viewport";
import useSidebar from "@hooks/useSidebar";
import BottomBar from "@layouts/BottomBar";
import Sidebar from "@layouts/Sidebar";

import Navbar from "../Navbar";
import MainPanel from "./MainPanel";
import PanelContainer from "./PanelContainer";

export default function Main({children}: {children: React.ReactNode}): JSX.Element {
	const {isOpenSidebar, sidebarWidth} = useSidebar();
	return (
		<Viewport>
			<Sidebar title={"MarketVerse"} display={{base: "none", lg: "block"}} />
			<MainPanel
				display="flex"
				flexDirection="column"
				w={{
					base: "100%",
					lg: !isOpenSidebar
						? `calc(100% - ${sidebarWidth} + 10px)` // Remove margins
						: `calc(100% - ${sidebarWidth})`,
				}}>
				<Navbar />
				<PanelContainer>
					{children}
					<Box minHeight="95px" display={{base: "flex", lg: "none"}} />
				</PanelContainer>
				<BottomBar display={{base: "flex", lg: "none"}} />
			</MainPanel>
		</Viewport>
	);
}
