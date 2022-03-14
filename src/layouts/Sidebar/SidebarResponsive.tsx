import {useRef} from "react";
import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Link,
	Stack,
	Text,
} from "@chakra-ui/react";

import Separator from "@components/Separator";
import {useMenu} from "@contexts/Global";

function SidebarResponsive({title, children}): JSX.Element {
	const mainPanel = useRef();
	const {isMenuOpen, onToggleMenu} = useMenu();

	var brand = (
		<Box pt={"35px"} mb="8px">
			<Link
				href={`/`}
				target="_blank"
				display="flex"
				lineHeight="100%"
				mb="30px"
				fontWeight="bold"
				justifyContent="center"
				alignItems="center"
				fontSize="11px">
				<Text fontSize="sm" mt="3px">
					{title}
				</Text>
			</Link>
			<Separator></Separator>
		</Box>
	);

	return (
		<Flex display={{base: "flex", lg: "none"}} ref={mainPanel} alignItems="center">
			<Drawer isOpen={isMenuOpen} onClose={onToggleMenu}>
				<DrawerOverlay />
				<DrawerContent
					w="250px"
					maxW="250px"
					me={{
						sm: "16px",
					}}
					my={{
						sm: "16px",
					}}
					borderRadius="16px">
					<DrawerCloseButton _focus={{boxShadow: "none"}} _hover={{boxShadow: "none"}} />
					<DrawerBody maxW="250px" px="1rem">
						<Box maxW="100%">
							<Box>{brand}</Box>
							<Stack direction="column" mb="40px">
								<Box>{children}</Box>
							</Stack>
						</Box>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
}

export default SidebarResponsive;
