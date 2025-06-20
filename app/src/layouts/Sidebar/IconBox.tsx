import {Flex} from "@chakra-ui/react";

export default function IconBox(props): JSX.Element {
	const {children, ...rest} = props;

	return (
		<Flex alignItems={"center"} justifyContent={"center"} borderRadius={"12px"} {...rest}>
			{children}
		</Flex>
	);
}
