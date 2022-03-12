import {useRef} from "react";
import {Box, useColorModeValue as mode} from "@chakra-ui/react";

import useRoutes from "@hooks/useRoutes";

import SidebarContent from "./SidebarContent";
import SidebarResponsive from "./SidebarResponsive";
import SidebarSection from "./SidebarSection";

function Sidebar({title, sidebarVariant = null}): JSX.Element {
	const routes = useRoutes();
	const mainPanel = useRef();
	let variantChange = "0.2s linear";

	let sidebarBg = "none";
	let sidebarRadius = "0px";
	let sidebarMargins = "0px";
	if (sidebarVariant === "opaque") {
		sidebarBg = mode("white", "gray.700");
		sidebarRadius = "16px";
		sidebarMargins = "16px 0px 16px 16px";
	}
	const state = {};
	const createSections = () => {
		return routes.map((prop, key) => <SidebarSection key={key} {...prop} state={state} />);
	};

	return (
		<>
			<Box display={{sm: "none", lg: "block"}} ref={mainPanel}>
				<Box position="fixed">
					<Box
						bg={sidebarBg}
						transition={variantChange}
						w="260px"
						maxW="260px"
						my={{
							sm: "16px",
						}}
						h="calc(100vh - 32px)"
						ps="20px"
						pe="20px"
						m={sidebarMargins}
						borderRadius={sidebarRadius}>
						<SidebarContent title={title}>{createSections()}</SidebarContent>
					</Box>
				</Box>
			</Box>
			<SidebarResponsive title={title}>{createSections()}</SidebarResponsive>
		</>
	);
}

export default Sidebar;
