import Viewport from "@components/Viewport";
import Sidebar from "@layouts/Sidebar";

import Navbar from "../Navbar";
import MainPanel from "./MainPanel";
import PanelContainer from "./PanelContainer";

export default function Main({children}: {children: React.ReactNode}): JSX.Element {
	return (
		<Viewport>
			<Sidebar title={"Marketplace"} />
			<MainPanel
				w={{
					base: "100%",
					lg: "calc(100% - 275px)",
				}}>
				<Navbar />
				<PanelContainer>{children}</PanelContainer>
			</MainPanel>
		</Viewport>
	);
}
