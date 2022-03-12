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
					mb={{
						xl: "12px",
					}}
					mx="auto"
					ps={{
						sm: "10px",
						xl: "16px",
					}}
					py="12px">
					{document.documentElement.dir === "rtl" ? props.rtlName : props.name}
				</Text>
				<SidebarSection {...props.views} />
			</div>
		);
	}
	return (
		<NavLink href={props.href} key={props.href}>
			{activeRoute(props.href) === "active" ? (
				<Button
					boxSize="initial"
					justifyContent="flex-start"
					alignItems="center"
					bg={activeBg}
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
					boxShadow="md"
					w="100%">
					<Flex>
						<IconBox bg="purple.500" color="white" h="30px" w="30px" me="12px">
							{props.icon}
						</IconBox>
						<Text color={activeColor} my="auto" fontSize="sm">
							{props.label}
						</Text>
					</Flex>
				</Button>
			) : (
				<Button
					boxSize="initial"
					justifyContent="flex-start"
					alignItems="center"
					bg="transparent"
					mb={{
						xl: "12px",
					}}
					mx={{
						xl: "auto",
					}}
					py="12px"
					ps={{
						sm: "10px",
						xl: "16px",
					}}
					borderRadius="15px"
					w="100%">
					<Flex>
						<IconBox bg={inactiveBg} color="purple.500" h="30px" w="30px" me="12px">
							{props.icon}
						</IconBox>
						<Text color={inactiveColor} my="auto" fontSize="sm">
							{props.label}
						</Text>
					</Flex>
				</Button>
			)}
		</NavLink>
	);
}

export default SidebarSection;
