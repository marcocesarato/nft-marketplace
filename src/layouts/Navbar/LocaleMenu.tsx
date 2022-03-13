import Image from "next/image";
import {useRouter} from "next/router";
import {Button, Flex, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";

import EnFlag from "@assets/svg/flags/en.svg";
import ItFlag from "@assets/svg/flags/it.svg";

const locales = {
	en: EnFlag,
	it: ItFlag,
};

export default function LocaleMenu(): JSX.Element {
	const router = useRouter();

	const onSelectLocale = (lang: string): void => {
		router.push(router.pathname, router.pathname, {locale: lang});
	};
	return (
		<Menu>
			<MenuButton as={Button} borderRadius="xl" ml={3} px={3} height="38px">
				<Flex alignItems="center" justifyContent="center">
					<Image
						height={"16px"}
						width={"16px"}
						objectFit={"cover"}
						src={locales[router?.locale || "en"]}
					/>
				</Flex>
			</MenuButton>
			<MenuList alignItems={"center"} p={0} minW="0" w={"48px"}>
				{Object.entries(locales).map(([lang, flag]) => (
					<MenuItem onClick={() => onSelectLocale(lang)} width="48px" height={"48px"}>
						<Image height="100%" width="100%" objectFit={"cover"} src={flag} />
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
}
