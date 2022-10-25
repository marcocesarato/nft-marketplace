import Image from "next/image";
import {useRouter} from "next/router";
import {Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";

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
					<Box height="16px" width="16px" position="relative">
						<Image
							fill={true}
							src={locales[router?.locale || "en"]}
							style={{objectFit: "cover"}}
							alt={router?.locale || "en"}
						/>
					</Box>
				</Flex>
			</MenuButton>
			<MenuList
				alignItems={"center"}
				p={0}
				minW="0"
				w={"48px"}
				borderWidth="0"
				boxShadow="md">
				{Object.entries(locales).map(([lang, flag]) => (
					<MenuItem
						key={lang}
						onClick={() => onSelectLocale(lang)}
						width="48px"
						height="48px"
						position="relative">
						<Image
							width={48}
							height={48}
							src={flag}
							style={{objectFit: "cover"}}
							alt={lang}
						/>
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
}
