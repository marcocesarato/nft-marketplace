import React from "react";
import {Center} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import BuyCrypto from "@components/BuyCrypto";
import Header from "@components/Header";
import useAccount from "@hooks/useAccount";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function BuyCryptoPage(): JSX.Element {
	const {isConnected} = useAccount();
	const {t} = useTranslation();

	if (!isConnected)
		return (
			<Header title={t<string>("error:title")} subtitle={t<string>("error:auth.required")} />
		);

	return (
		<Center flex="1" p="8">
			<BuyCrypto />
		</Center>
	);
}
