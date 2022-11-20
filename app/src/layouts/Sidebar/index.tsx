import {useMemo, useRef} from "react";
import {BsLayoutSidebar, BsLayoutSidebarInset} from "react-icons/bs";
import {Box, ResponsiveValue} from "@chakra-ui/react";
import * as CSS from "csstype";
import {useTranslation} from "next-i18next";

import useRoutes from "@hooks/useRoutes";
import useSidebar from "@hooks/useSidebar";

import SidebarBalanceSection from "./SidebarBalanceSection";
import SidebarContent from "./SidebarContent";
import SidebarResponsive from "./SidebarResponsive";
import SidebarSection from "./SidebarSection";

//import {AiOutlineLogout} from "react-icons/ai";
//import {signOut} from "next-auth/react";
//import useAccount from "@hooks/useAccount";

export type SidebarProps = {
	title: string;
	position?: ResponsiveValue<CSS.Property.Position>;
	[key: string]: any;
};

function Sidebar({title, position = "fixed", compress, ...props}: SidebarProps): JSX.Element {
	const {t} = useTranslation();
	const routes = useRoutes();
	//const {isConnected} = useAccount();
	const {sidebarWidth, isSidebarCompress, onToggleSidebar} = useSidebar();
	const mainPanel = useRef();

	const Content = useMemo(() => {
		const SidebarContent = ({mobile = false}): JSX.Element => {
			const createRoutes = () => {
				return routes.map(({label, ...prop}, key) => (
					<SidebarSection
						key={key}
						label={t<string>(label)}
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
		return SidebarContent;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSidebarCompress, routes]);

	const marginsY = {
		sm: "25px",
	};
	const paddingX = !isSidebarCompress ? "20px" : "10px";

	return (
		<>
			<Box {...props} ref={mainPanel}>
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
								{/*isConnected && (
									<SidebarSection
										label={t<string>("common:action.disconnect")}
										icon={AiOutlineLogout}
										compress={isSidebarCompress}
										onClick={() => signOut()}
									/>
                                )*/}
								<SidebarSection
									label={t<string>("common:account.compress")}
									icon={
										isSidebarCompress ? BsLayoutSidebarInset : BsLayoutSidebar
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
