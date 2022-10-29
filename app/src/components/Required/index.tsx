import {Text} from "@chakra-ui/react";

export default function Required(props): JSX.Element {
	return (
		<Text as="span" color="red" ml={1} {...props}>
			*
		</Text>
	);
}
