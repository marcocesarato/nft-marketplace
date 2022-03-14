import {Box, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";

import Header from "../Header";

export default function SourceTable({title, subtitle, data, columns, rowKey}): JSX.Element {
	return (
		<Box py="12" width="full">
			<Box
				mx="auto"
				px={{
					base: "6",
					md: "8",
				}}>
				<Box overflowX="auto">
					<Header title={title} subtitle={subtitle} />
					<Table my="8" fontSize="sm">
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
				</Box>
			</Box>
		</Box>
	);
}
