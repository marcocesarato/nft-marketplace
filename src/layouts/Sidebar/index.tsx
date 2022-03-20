import {useMemo, useRef} from "react";
import {AiOutlineLogout} from "react-icons/ai";
import {BsLayoutSidebar, BsLayoutSidebarInset} from "react-icons/bs";
import {Box} from "@chakra-ui/react";
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
	const {sidebarWidth, isSidebarCompress, onToggleSidebar} = useSidebar();
	const mainPanel = useRef();

	const Content = useMemo(() => {
		return ({mobile = false}): JSX.Element => {
			const createRoutes = () => {
				return routes.map(({label, ...prop}, key) => (
					<SidebarSection
						key={key}
						label={t(label)}
						{...prop}
						compress={!mobile && isSidebarCompress}
					/>
				));
			};
			return (
				<>
					{createRoutes()}
					{!isSidebarCompress && <SidebarBalanceSection />}
				</>
			);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSidebarCompress, routes]);

	const marginsY = {
		sm: "25px",
	};
	const paddingX = !isSidebarCompress ? "20px" : "10px";

	return (
		<>
			<Box display={{sm: "none", lg: "block"}} ref={mainPanel}>
				<Box position="fixed">
					<Box
						display="block"
						transition="0.2s linear"
						w={sidebarWidth}
						h="calc(100vh - 175px)"
						overflow="auto"
						m="0"
						my={marginsY}
						px={paddingX}>
						<SidebarContent title={title} compress={isSidebarCompress}>
							<Content />
							<Box
								position="fixed"
								bottom="10px"
								px={paddingX}
								w={sidebarWidth}
								my={marginsY}>
								{isAuthenticated && (
									<SidebarSection
										label={t("common:action.disconnect")}
										icon={<AiOutlineLogout />}
										compress={isSidebarCompress}
										onClick={logout}
									/>
								)}
								<SidebarSection
									label={t("common:account.compress")}
									icon={
										isSidebarCompress ? (
											<BsLayoutSidebarInset />
										) : (
											<BsLayoutSidebar />
										)
									}
									compress={isSidebarCompress}
									onClick={onToggleSidebar}
								/>
							</Box>
						</SidebarContent>
					</Box>
				</Box>
			</Box>
			<SidebarResponsive title={title}>
				<Content mobile={true} />
			</SidebarResponsive>
		</>
	);
}

export default Sidebar;
