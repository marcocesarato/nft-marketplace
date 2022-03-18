import {Button} from "@chakra-ui/react";

export default function ActionButton(props): JSX.Element {
	const inverseColors = {
		background: "purple.300",
		color: "purple.900",
	};
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
			_hover={inverseColors}
			_active={inverseColors}
			{...props}
		/>
	);
}
