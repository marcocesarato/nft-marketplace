import {ComponentProps, ReactNode} from "react";
import NavLink from "next/link";
import {useRouter} from "next/router";
import {Box, Button, Flex, Text, useColorModeValue as mode} from "@chakra-ui/react";

import IconBox from "./IconBox";

interface SidebarSectionProps extends ComponentProps<typeof Box> {
	category?: boolean;
	icon?: ReactNode | string;
	href?: string;
	onClick?: () => void;
	compress?: boolean;
	label: string;
}

function SidebarSection({
	category,
	label,
	href = "#",
	compress = false,
	icon,
	onClick,
	...props
}: SidebarSectionProps): JSX.Element {
	const router = useRouter();
	const activeRoute = (routeName: string) => {
		return router?.asPath === routeName ? "active" : "";
	};

	const activeBg = mode("white", "gray.700");
	const inactiveBg = mode("white", "gray.700");
	const activeColor = mode("gray.700", "white");
	const inactiveColor = mode("gray.400", "gray.400");

	if (category) {
		return (
			<div key={label}>
				<Text
					color={activeColor}
					fontWeight="bold"
					mx="auto"
					ps={{
						sm: "10px",
						xl: "16px",
					}}
					py="12px">
					{label}
				</Text>
			</div>
		);
	}
	const isActive = activeRoute(href) === "active";

	return (
		<Box {...props} w={!compress ? "full" : "50px"}>
			<NavLink href={href} key={href} passHref>
				<Button
					transition="width 0.2s linear"
					height="54px"
					boxSize="initial"
					justifyContent="flex-start"
					alignItems="center"
					bg={isActive ? activeBg : "transparent"}
					mb={"5px"}
					mx={{
						xl: "auto",
					}}
					ps={{
						sm: "10px",
						xl: compress ? "10px" : "16px",
					}}
					py="12px"
					borderRadius="15px"
					onClick={onClick}
					boxShadow={isActive ? "sm" : null}
					w="100%">
					<Flex>
						<IconBox
							bg={isActive ? "main" : inactiveBg}
							color={isActive ? "white" : "main"}
							h="30px"
							w="30px"
							me="12px">
							{icon}
						</IconBox>
						{!compress && (
							<Text
								color={isActive ? activeColor : inactiveColor}
								my="auto"
								fontSize="sm">
								{label}
							</Text>
						)}
					</Flex>
				</Button>
			</NavLink>
		</Box>
	);
}

export default SidebarSection;
