import {useRouter} from "next/router";
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
import {useTranslation} from "next-i18next";

import Avatar from "@components/Avatar";
import useAccount from "@hooks/useAccount";
import useUser from "@hooks/useUser";

export default function UserMenu({openAccountModal}): JSX.Element {
	const {t} = useTranslation();
	const {account, logout} = useAccount();
	const {username} = useUser();
	const router = useRouter();

	function handleLogout() {
		logout();
		router.push("/");
	}

	function handleProfile() {
		router.push("/account/" + account);
	}

	return (
		<Menu>
			<MenuButton as={Button} borderRadius="xl" m="1px" px={3} height="38px">
				<Flex alignItems="center" justifyContent="center">
					<Avatar address={account} />
					<Text
						display={{base: "none", md: "inline-block"}}
						fontSize="md"
						fontWeight="500"
						mx="2">
						{username}
					</Text>
				</Flex>
			</MenuButton>
			<MenuList alignItems={"center"}>
				<MenuItem onClick={openAccountModal}>{t<string>("common:account.title")}</MenuItem>
				<MenuItem onClick={handleProfile}>{t<string>("common:account.profile")}</MenuItem>
				<MenuItem onClick={() => router.push("/transactions")}>
					{t<string>("common:account.activities")}
				</MenuItem>
				<MenuDivider />
				<MenuItem onClick={handleLogout}>{t<string>("common:action.disconnect")}</MenuItem>
			</MenuList>
		</Menu>
	);
}
