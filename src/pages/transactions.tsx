import {Box, Button} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Header from "@components/Header";
import Loading from "@components/Loading";
import Table from "@components/Table";
import useAccount from "@hooks/useAccount";
import useTransfers from "@hooks/useTransfers";
import {formatAddress} from "@utils/formatters";
import {getStaticPropsLocale} from "@utils/i18n";
import {getExplorer} from "@utils/networks";
import {formatUnits} from "@utils/units";

export const getStaticProps = getStaticPropsLocale;
export default function Transactions(): JSX.Element {
	const {t} = useTranslation();
	const {chainId} = useAccount();
	const {data, isLoading} = useTransfers();
	const columns = [
		{
			title: t("common:page.transactions.column.from"),
			dataIndex: "from_address",
			key: "from_address",
			render: (from) => formatAddress(from, 5),
		},
		{
			title: t("common:page.transactions.column.to"),
			dataIndex: "to_address",
			key: "to_address",
			render: (to) => formatAddress(to, 5),
		},
		{
			title: t("common:page.transactions.column.value"),
			dataIndex: "value",
			key: "value",
			render: (value) => formatUnits(value),
		},
		{
			title: t("common:page.transactions.column.timestamp"),
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
						<Button variant="link" colorScheme="purple">
							{t("common:action.viewOnExplorer")}
						</Button>
					</a>
				</Box>
			),
		},
	];

	if (isLoading) return <Loading />;
	if (!data || data.length === 0)
		return (
			<Header
				title={t("common:page.transactions.title")}
				subtitle={t("common:page.transactions.empty")}
			/>
		);

	let key = 0;
	return (
		<Table
			title={t("common:page.transactions.title")}
			subtitle={t("common:page.transactions.description")}
			data={data}
			columns={columns}
			rowKey={(record) => {
				key++;
				return `${record.transaction_hash}-${key}`;
			}}
		/>
	);
}
