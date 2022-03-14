import {useMemo, useRef} from "react";
import {AiOutlineLogout} from "react-icons/ai";
import {BsLayoutSidebar, BsLayoutSidebarInset} from "react-icons/bs";
import {Box, useBreakpointValue} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import useAccount from "@hooks/useAccount";
import useRoutes from "@hooks/useRoutes";
import useSidebar from "@hooks/useSidebar";

import SidebarBalanceSection from "./SidebarBalanceSection";
import SidebarContent from "./SidebarContent";
import SidebarResponsive from "./SidebarResponsive";
import SidebarSection from "./SidebarSection";

function Sidebar({title}): JSX.Element {
	const {t} = useTranslation();
	const routes = useRoutes();
	const {isAuthenticated, logout} = useAccount();
	const [sidebarIsOpen, onToggleSidebar] = useSidebar();
	const mainPanel = useRef();
	const compress = useBreakpointValue({base: false, lg: sidebarIsOpen});

	const Content = useMemo(() => {
		return (): JSX.Element => {
			const createRoutes = () => {
				return routes.map(({label, ...prop}, key) => (
					<SidebarSection key={key} label={t(label)} {...prop} compress={compress} />
				));
			};
			return (
				<>
					{createRoutes()}
					{!compress && <SidebarBalanceSection />}
				</>
			);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [compress, routes]);

	const marginsY = {
		sm: "25px",
	};
	const paddingX = !compress ? "20px" : "10px";
	const width = !compress ? "260px" : "70px";

	return (
		<>
			<Box display={{sm: "none", lg: "block"}} ref={mainPanel}>
				<Box position="fixed">
					<Box
						display="block"
						transition="0.2s linear"
						w={width}
						h="calc(100vh - 175px)"
						overflow="auto"
						m="0"
						my={marginsY}
						px={paddingX}>
						<SidebarContent title={title} compress={compress}>
							<Content />
							<Box
								position="fixed"
								bottom="10px"
								px={paddingX}
								w={width}
								my={marginsY}>
								{isAuthenticated && (
									<SidebarSection
										label={t("common:action.disconnect")}
										icon={<AiOutlineLogout />}
										compress={compress}
										onClick={logout}
									/>
								)}
								<SidebarSection
									label={t("common:account.compress")}
									icon={compress ? <BsLayoutSidebarInset /> : <BsLayoutSidebar />}
									compress={compress}
									onClick={onToggleSidebar}
								/>
							</Box>
						</SidebarContent>
					</Box>
				</Box>
			</Box>
			<SidebarResponsive title={title}>
				<Content />
			</SidebarResponsive>
		</>
	);
}

export default Sidebar;
