import {Flex} from "@chakra-ui/react";
export default function Content({children, ...props}) {
	return (
		<Flex flex="1" flexDirection="column" p={4} {...props}>
			{children}
		</Flex>
	);
}
