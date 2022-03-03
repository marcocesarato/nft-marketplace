import NextLink from "next/link";
import {Link, useColorModeValue} from "@chakra-ui/react";

export default function NavLink({link}) {
	return (
		<NextLink href={link.href} passHref>
			<Link
				px={2}
				py={1}
				rounded={"md"}
				_hover={{
					textDecoration: "none",
					bg: useColorModeValue("gray.200", "gray.700"),
				}}>
				{link.label}
			</Link>
		</NextLink>
	);
}
