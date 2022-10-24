import {Box, Heading} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {LineChart} from "@components/Chart";
import useAccount from "@hooks/useAccount";
import useBalance from "@hooks/useBalance";

import SidebarSection from "./SidebarSection";

function SidebarBalanceSection(): JSX.Element {
	const {t} = useTranslation();
	const {isFullAuthenticated} = useAccount();
	const {data: balance} = useBalance();
	if (!isFullAuthenticated) return null;
	return (
		<Box w="full">
			<SidebarSection category label={t<string>("common:account.balance")} />
			<Heading ps="15px" fontSize={"2xl"} fontWeight={500}>
				{balance?.formatted}
			</Heading>
			<LineChart
				chartData={[
					{
						name: t<string>("common:account.balance"),
						data: [200, 400, 300, 500, 400],
					},
				]}
			/>
		</Box>
	);
}

export default SidebarBalanceSection;
