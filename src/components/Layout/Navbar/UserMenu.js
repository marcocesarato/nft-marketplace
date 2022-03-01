import {
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import {useRouter} from "next/router";

import Avatar from "@components/Avatar";
import useAccount from "@hooks/useAccount";

export default function UserMenu({openAccountModal}) {
	const {username, logout} = useAccount();
	const router = useRouter();

	function handleLogout() {
		logout();
		router.push("/");
	}

	return (
		<Menu>
			<MenuButton as={Button} borderRadius="xl" m="1px" px={3} height="38px">
				<Flex alignItems="center" justifyContent="center">
					<Avatar />
					<Text fontSize="md" fontWeight="medium" mx="2">
						{username}
					</Text>
				</Flex>
			</MenuButton>
			<MenuList alignItems={"center"}>
				<MenuItem onClick={openAccountModal}>Account</MenuItem>
				<MenuItem onClick={() => router.push("/transactions")}>Activities</MenuItem>
				<MenuDivider />
				<MenuItem onClick={handleLogout}>Disconnect</MenuItem>
			</MenuList>
		</Menu>
	);
}
