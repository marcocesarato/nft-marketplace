import React, {useEffect, useState} from "react";
import {useMoralis} from "react-moralis";
import {Box, Center} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Header from "@components/Header";
import {useConfig} from "@contexts/Global";
import {getServerSidePropsSession} from "@utils/ssr";

export const getServerSideProps = getServerSidePropsSession;
export default function Crypto(): JSX.Element {
	const [ramper, setRamper] = useState();
	const {Moralis} = useMoralis();
	const {isLoggedSession} = useConfig();
	const {t} = useTranslation();

	useEffect(() => {
		if (!Moralis?.["Plugins"]?.["fiat"]) return null;
		async function initRamperPlugin() {
			Moralis.Plugins.fiat
				.buy({}, {disableTriggers: true})
				.then((data) => setRamper(data.data));
		}
		initRamperPlugin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Moralis.Plugins]);

	if (!isLoggedSession)
		return (
			<Header title={t<string>("error:title")} subtitle={t<string>("error:auth.required")} />
		);

	return (
		<Center flex="1" p="8">
			<Box
				as="iframe"
				src={ramper}
				title="ramper"
				frameBorder="no"
				allow="accelerometer; autoplay; camera; gyroscope; payment;"
				w="420px"
				h="625px"
				boxShadow="lg"
				borderRadius="xl"
				bg="gray.100"
			/>
		</Center>
	);
}
