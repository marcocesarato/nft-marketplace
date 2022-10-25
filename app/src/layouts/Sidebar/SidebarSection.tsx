import {ComponentProps, ReactNode} from "react";
import type {IconType} from "react-icons";
import NavLink from "next/link";
import {useRouter} from "next/router";
import {As, Box, Button, Flex, Icon, Text, useColorModeValue as mode} from "@chakra-ui/react";

import {getPath} from "@utils/url";

import IconBox from "./IconBox";

interface SidebarSectionProps extends ComponentProps<typeof Box> {
	category?: boolean;
	icon?: ReactNode | IconType | string;
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
		const path = getPath(router?.asPath);
		return path === routeName ? "active" : "";
	};

	const hoverBg = mode("gray.200", "gray.900");
	const activeBg = mode("white", "gray.900");
	const inactiveBg = mode("white", "gray.700");
	const activeColor = mode("primary", "primary");
	const inactiveColor = mode("gray.500", "gray.400");

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
			<NavLink href={href} key={href} passHref legacyBehavior>
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
					w="100%"
					_hover={{bg: hoverBg}}
					_focus={{bg: activeBg}}
					_active={{bg: activeBg}}>
					<Flex>
						<IconBox
							bg={isActive ? "primary" : inactiveBg}
							color={isActive ? inactiveBg : "primary"}
							h="30px"
							w="30px"
							me="12px">
							<Icon aria-hidden as={icon as As<any>} />
						</IconBox>
						{!compress && (
							<Text
								color={isActive ? activeColor : inactiveColor}
								my="auto"
								fontWeight="normal"
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
