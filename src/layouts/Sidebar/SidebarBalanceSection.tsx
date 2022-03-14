import {Box, Heading} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {LineChart} from "@components/Chart";
import useAccount from "@hooks/useAccount";
import useBalance from "@hooks/useBalance";

import SidebarSection from "./SidebarSection";

function SidebarBalanceSection(): JSX.Element {
	const {t} = useTranslation();
	const {isAuthenticated} = useAccount();
	const {data: balance} = useBalance();
	if (!isAuthenticated) return null;
	return (
		<Box w="full">
			<SidebarSection category label={t("common:account.balance")} />
			<Heading ps="15px" fontSize={"2xl"} fontWeight={500}>
				{balance?.formatted}
			</Heading>
			<LineChart
				chartData={[
					{
						name: t("common:account.balance"),
						data: [200, 400, 300, 500, 400],
					},
				]}
			/>
		</Box>
	);
}

export default SidebarBalanceSection;
