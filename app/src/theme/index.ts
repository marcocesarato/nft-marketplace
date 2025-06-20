import {extendTheme} from "@chakra-ui/react";

import {CardComponent} from "./additions/card/Card";
import {CardBodyComponent} from "./additions/card/CardBody";
import {CardHeaderComponent} from "./additions/card/CardHeader";
import {MainPanelComponent} from "./additions/layout/MainPanel";
import {PanelContainerComponent} from "./additions/layout/PanelContainer";
import {BottomNavigationComponent} from "./additions/navigation/BottomNavigation";
import {badgeStyles} from "./components/badge";
import {buttonStyles} from "./components/button";
import {drawerStyles} from "./components/drawer";
import {linkStyles} from "./components/link";
import {menuStyles} from "./components/menu";
import {modalStyles} from "./components/modal";
import {semanticTokens} from "./foundations/semanticTokens";
import {globalStyles} from "./styles";

export default extendTheme(
	globalStyles,
	{semanticTokens}, // Semantic tokens
	buttonStyles, // Button styles
	badgeStyles, // Badge styles
	linkStyles, // Link styles
	menuStyles, // Menu styles
	modalStyles, // Modal styles
	drawerStyles, // Sidebar variant for Chakra's drawer
	CardComponent, // Card component
	CardBodyComponent, // Card Body component
	CardHeaderComponent, // Card Header component
	MainPanelComponent, // Main Panel component
	PanelContainerComponent, // Panel Container component
	BottomNavigationComponent, // Bottom Navigation component
);
