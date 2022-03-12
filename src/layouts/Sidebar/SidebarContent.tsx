import {ReactNode} from "react";
import {Box, Link, Stack, Text} from "@chakra-ui/react";

import Separator from "@components/Separator";

const SidebarContent = ({title, children}: {title: string; children: ReactNode}): JSX.Element => {
	return (
		<Box>
			<Box pt={"15px"} mb="12px">
				<Link
					href={`/`}
					target="_blank"
					display="flex"
					lineHeight="100%"
					mb={8}
					fontWeight="bold"
					justifyContent="center"
					alignItems="center"
					fontSize="11px">
					<Text fontSize="2xl" mt="3px">
						{title}
					</Text>
				</Link>
				<Separator></Separator>
			</Box>
			<Stack direction="column" mb="40px">
				<Box>{children}</Box>
			</Stack>
		</Box>
	);
};

export default SidebarContent;
