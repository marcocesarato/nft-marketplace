import NextLink from "next/link";
import {Link, useColorModeValue} from "@chakra-ui/react";

export default function NavLink({link, children}): JSX.Element {
	return (
		<NextLink href={link} passHref legacyBehavior>
			<Link
				px={2}
				py={1}
				rounded={"md"}
				_hover={{
					textDecoration: "none",
					bg: useColorModeValue("gray.200", "gray.700"),
				}}>
				{children}
			</Link>
		</NextLink>
	);
}
