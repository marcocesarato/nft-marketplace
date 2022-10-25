import {useRouter} from "next/router";
import {HamburgerIcon} from "@chakra-ui/icons";
import {Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList} from "@chakra-ui/react";
import {signOut} from "next-auth/react";
import {useTranslation} from "next-i18next";

import useAccount from "@hooks/useAccount";
import {getAccountUrl, getGalleryBuilderUrl, getGalleryUrl} from "@utils/url";

export default function UserMenu({openAccountModal}): JSX.Element {
	const {t} = useTranslation();
	const {address} = useAccount();
	const router = useRouter();

	function handleLogout() {
		signOut();
		router.push("/");
	}

	function handleProfile() {
		router.push(getAccountUrl(address));
	}

	function handleGallery() {
		router.push(getGalleryUrl());
	}

	function handleGalleryBuilder() {
		router.push(getGalleryBuilderUrl());
	}

	function handleBuyCrypto() {
		router.push("/crypto");
	}

	return (
		<Menu>
			<MenuButton as={Button} borderRadius="xl" m="1px" px={3} height="38px">
				<Flex alignItems="center" justifyContent="center">
					<HamburgerIcon />
				</Flex>
			</MenuButton>
			<MenuList alignItems={"center"}>
				<MenuItem onClick={openAccountModal}>{t<string>("common:account.title")}</MenuItem>
				<MenuDivider />
				<MenuItem onClick={handleProfile}>{t<string>("common:account.profile")}</MenuItem>
				<MenuItem onClick={() => router.push("/transactions")}>
					{t<string>("common:account.activities")}
				</MenuItem>
				<MenuItem onClick={handleBuyCrypto}>Buy crypto</MenuItem>
				<MenuDivider />
				<MenuItem onClick={handleGallery}>{t<string>("common:account.gallery")}</MenuItem>
				<MenuItem onClick={handleGalleryBuilder}>
					{t<string>("common:account.galleryBuilder")}
				</MenuItem>
				<MenuDivider />
				<MenuItem onClick={handleLogout}>{t<string>("common:action.disconnect")}</MenuItem>
			</MenuList>
		</Menu>
	);
}
