import {Link} from "@chakra-ui/react";

export default function LinkButton(props): JSX.Element {
	return (
		<Link
			fontSize="sm"
			display="flex"
			alignItems="center"
			color="gray.400"
			_hover={{
				color: "purple.300",
				textDecoration: "none",
			}}
			{...props}
		/>
	);
}
