import Viewport from "@components/Viewport";
import useSidebar from "@hooks/useSidebar";
import Sidebar from "@layouts/Sidebar";

import Navbar from "../Navbar";
import MainPanel from "./MainPanel";
import PanelContainer from "./PanelContainer";

export default function Main({children}: {children: React.ReactNode}): JSX.Element {
	const [isOpenSidebar] = useSidebar();
	return (
		<Viewport>
			<Sidebar title={"Marketplace"} />
			<MainPanel
				w={{
					base: "100%",
					lg: isOpenSidebar ? "calc(100% - 60px)" : "calc(100% - 250px)",
				}}>
				<Navbar />
				<PanelContainer>{children}</PanelContainer>
			</MainPanel>
		</Viewport>
	);
}
