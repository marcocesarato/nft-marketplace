import {ExternalLinkIcon} from "@chakra-ui/icons";
import {Box, Link} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";
import {useNetwork} from "wagmi";

import {TokenTransaction} from "@app/types";
import Header from "@components/Header";
import Loading from "@components/Loading";
import Table from "@components/Table";
import ErrorAlert from "@errors/ErrorAlert";
import {useWalletNFTTransferQuery} from "@services/graphql";
import {chainHex} from "@utils/converters";
import {formatAddress} from "@utils/formatters";
import {formatUnits} from "@utils/units";

export type TransfersProps = {
	address: string;
	title?: string;
	subtitle?: string;
	[key: string]: any;
};

export default function Transfers({
	address,
	title,
	subtitle,
	...props
}: TransfersProps): JSX.Element {
	const {t} = useTranslation();
	const {chain} = useNetwork();
	const {data, loading, error} = useWalletNFTTransferQuery({
		variables: {
			chain: chainHex(chain),
			address,
		},
	});
	const items = data?.walletNFTTransfers;
	const columns = [
		{
			title: t<string>("common:page.transfers.column.from"),
			dataIndex: "from_address",
			key: "from_address",
			render: (from: string) => (
				<Link
					href={`${chain?.blockExplorers?.default.url}/address/${from}`}
					isExternal
					color="primary"
					colorScheme="purple">
					{formatAddress(from, 5)}
					<ExternalLinkIcon mx="3px" />
				</Link>
			),
		},
		{
			title: t<string>("common:page.transfers.column.to"),
			dataIndex: "to_address",
			key: "to_address",
			render: (to: string) => (
				<Link
					href={`${chain?.blockExplorers?.default.url}/address/${to}`}
					isExternal
					color="primary"
					colorScheme="purple">
					{formatAddress(to, 5)}
					<ExternalLinkIcon mx="3px" />
				</Link>
			),
		},
		{
			title: t<string>("common:page.transfers.column.value"),
			dataIndex: "value",
			key: "value",
			render: (value: string) => formatUnits(value),
		},
		{
			title: t<string>("common:page.transfers.column.timestamp"),
			dataIndex: "block_timestamp",
			key: "block_timestamp",
			render: (value: string) => new Date(value).toLocaleString(),
		},
		{
			title: "",
			dataIndex: "transaction_hash",
			key: "transaction_hash",
			render: (hash: string) => (
				<Box textAlign="right">
					<Link
						href={`${chain?.blockExplorers?.default.url}/tx/${hash}`}
						isExternal
						color="primary"
						colorScheme="purple">
						{t<string>("common:action.viewOnExplorer")}
						<ExternalLinkIcon mx="3px" />
					</Link>
				</Box>
			),
		},
	];

	if (loading) return <Loading />;
	if (!items || items.length === 0)
		return (
			<Header
				title={title ?? t<string>("common:page.transfers.title")}
				subtitle={t<string>("common:page.transfers.empty")}
			/>
		);

	let key = 0;
	return (
		<>
			{(title || subtitle) && <Header title={title} subtitle={subtitle} />}
			{error && (
				<ErrorAlert error={t<string>("error:unexpectedError")} message={error.message} />
			)}
			<Table
				data={items}
				columns={columns}
				rowKey={(record: TokenTransaction) => {
					key++;
					return `${record.transaction_hash}-${key}`;
				}}
				{...props}
			/>
		</>
	);
}
