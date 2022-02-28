import {Button} from "@chakra-ui/react";

export default function ActionButton(props) {
	return (
		<Button
			as="a"
			size="sm"
			fontSize="13px"
			fontWeight="normal"
			ml={2}
			px={4}
			height="26px"
			bg="gray.700"
			color="gray.400"
			_hover={{
				background: "blue.900",
				color: "blue.300",
			}}
			_active={{
				background: "blue.900",
				color: "blue.300",
			}}
			{...props}
		/>
	);
}
