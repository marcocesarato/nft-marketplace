import NavLink from "next/link";
import {useRouter} from "next/router";
import {Button, Flex, Text, useColorModeValue as mode} from "@chakra-ui/react";

import IconBox from "./IconBox";

function SidebarSection(props): JSX.Element {
	const router = useRouter();
	const activeRoute = (routeName) => {
		return router?.asPath === routeName ? "active" : "";
	};

	const activeBg = mode("white", "gray.700");
	const inactiveBg = mode("white", "gray.700");
	const activeColor = mode("gray.700", "white");
	const inactiveColor = mode("gray.400", "gray.400");

	if (props.redirect) {
		return null;
	}
	if (props.category) {
		const st = {};
		st[props["state"]] = !props.state[props.state];
		return (
			<div key={props.label}>
				<Text
					color={activeColor}
					fontWeight="bold"
					mx="auto"
					ps={{
						sm: "10px",
						xl: "16px",
					}}
					py="12px">
					{props.label}
				</Text>
			</div>
		);
	}
	const isActive = activeRoute(props.href) === "active";

	return (
		<NavLink href={props.href} key={props.href} passHref>
			<Button
				boxSize="initial"
				justifyContent="flex-start"
				alignItems="center"
				bg={isActive ? activeBg : "transparent"}
				mb={{
					xl: "12px",
				}}
				mx={{
					xl: "auto",
				}}
				ps={{
					sm: "10px",
					xl: "16px",
				}}
				py="12px"
				borderRadius="15px"
				boxShadow={isActive ? "sm" : null}
				w="100%">
				<Flex>
					<IconBox
						bg={isActive ? "main" : inactiveBg}
						color={isActive ? "white" : "main"}
						h="30px"
						w="30px"
						me="12px">
						{props.icon}
					</IconBox>
					<Text color={isActive ? activeColor : inactiveColor} my="auto" fontSize="sm">
						{props.label}
					</Text>
				</Flex>
			</Button>
		</NavLink>
	);
}

export default SidebarSection;
