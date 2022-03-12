import {Box, Button} from "@chakra-ui/react";

import Header from "@components/Header";
import Loading from "@components/Loading";
import Table from "@components/Table";
import useAccount from "@hooks/useAccount";
import useTransfers from "@hooks/useTransfers";
import {formatAddress} from "@utils/formatters";
import {getExplorer} from "@utils/networks";
import {formatUnits} from "@utils/units";

export default function Transactions(): JSX.Element {
	const {chainId} = useAccount();
	const {data, isLoading} = useTransfers();
	const columns = [
		{
			title: "From",
			dataIndex: "from_address",
			key: "from_address",
			render: (from) => formatAddress(from, 5),
		},
		{
			title: "To",
			dataIndex: "to_address",
			key: "to_address",
			render: (to) => formatAddress(to, 5),
		},
		{
			title: "Value",
			dataIndex: "value",
			key: "value",
			render: (value) => formatUnits(value),
		},
		{
			title: "Timestamp",
			dataIndex: "block_timestamp",
			key: "block_timestamp",
			render: (value) => new Date(value).toLocaleString(),
		},
		{
			title: "",
			dataIndex: "transaction_hash",
			key: "transaction_hash",
			render: (hash) => (
				<Box textAlign="right">
					<a href={`${getExplorer(chainId)}/tx/${hash}`} target="_blank" rel="noreferrer">
						<Button variant="link" colorScheme="blue">
							View on explorer
						</Button>
					</a>
				</Box>
			),
		},
	];

	if (isLoading) return <Loading />;
	if (!data || data.length === 0)
		return <Header title="Transactions" subtitle="No transactions found on the account." />;

	let key = 0;
	return (
		<Table
			title="Transactions"
			subtitle="Account activities history."
			data={data}
			columns={columns}
			rowKey={(record) => {
				key++;
				return `${record.transaction_hash}-${key}`;
			}}
		/>
	);
}
