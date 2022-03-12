import {Button} from "@chakra-ui/react";

export default function ActionButton(props): JSX.Element {
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
			cursor="pointer"
			_hover={{
				background: "purple.900",
				color: "purple.300",
			}}
			_active={{
				background: "purple.900",
				color: "purple.300",
			}}
			{...props}
		/>
	);
}
