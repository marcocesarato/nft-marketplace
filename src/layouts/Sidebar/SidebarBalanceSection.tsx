import {Heading} from "@chakra-ui/react";

import {LineChart} from "@components/Chart";
import useAccount from "@hooks/useAccount";
import useBalance from "@hooks/useBalance";

import SidebarSection from "./SidebarSection";

function SidebarBalanceSection({state}): JSX.Element {
	const {isAuthenticated} = useAccount();
	const {data: balance} = useBalance();
	if (!isAuthenticated) return null;
	return (
		<>
			<SidebarSection category label="Balance" state={state} />
			<Heading ps="15px" fontSize={"2xl"} fontWeight={500}>
				{balance.formatted}
			</Heading>
			<LineChart
				chartData={[
					{
						name: "Balance",
						data: [200, 400, 300, 500, 400],
					},
				]}
			/>
		</>
	);
}

export default SidebarBalanceSection;
