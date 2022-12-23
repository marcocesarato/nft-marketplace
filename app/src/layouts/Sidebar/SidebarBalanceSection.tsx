import {Box, Heading} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {LineChart} from "@components/Chart";
import useAccount from "@hooks/useAccount";
import useBalance from "@hooks/useBalance";

import SidebarSection from "./SidebarSection";

function SidebarBalanceSection(): JSX.Element {
	const {t} = useTranslation();
	const {isConnected} = useAccount();
	const {display} = useBalance();
	if (!isConnected) return null;
	return (
		<Box w="full">
			<SidebarSection category label={t<string>("common:account.balance")} />
			<Heading ps="15px" fontSize={"2xl"} fontWeight={500}>
				{display}
			</Heading>
			{/*<LineChart
				chartData={[
				]}
			/>*/}
		</Box>
	);
}

export default SidebarBalanceSection;
