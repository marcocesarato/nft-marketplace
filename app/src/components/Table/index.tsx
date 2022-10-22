import {Table, Tbody, Td, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";

export default function SourceTable({data, columns, rowKey, ...props}): JSX.Element {
	return (
		<Table fontSize="sm" {...props}>
			<Thead bg={useColorModeValue("gray.50", "gray.800")}>
				<Tr>
					{columns.map((column, index) => (
						<Th whiteSpace="nowrap" scope="col" key={index}>
							{column.title}
						</Th>
					))}
				</Tr>
			</Thead>
			<Tbody>
				{data.map((row) => (
					<Tr key={rowKey(row)}>
						{columns.map((column, index) => {
							const cell = row[column.key];
							const element = column.render?.(cell) ?? cell;
							return (
								<Td whiteSpace="nowrap" key={index}>
									{element}
								</Td>
							);
						})}
					</Tr>
				))}
			</Tbody>
		</Table>
	);
}
