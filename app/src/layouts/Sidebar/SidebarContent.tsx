import {ReactNode} from "react";
import {Box, Link, Text, VStack} from "@chakra-ui/react";

import Separator from "@components/Separator";

const SidebarContent = ({
	title,
	compress,
	children,
}: {
	title: string;
	compress?: boolean;
	children: ReactNode;
}): JSX.Element => {
	return (
		<Box>
			{!compress && (
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
					<Separator />
				</Box>
			)}
			<VStack direction="column" w="full">
				{children}
			</VStack>
		</Box>
	);
};

export default SidebarContent;
