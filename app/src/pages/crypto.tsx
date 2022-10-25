import React, {useState} from "react";
import {Box, Center} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Header from "@components/Header";
import useAccount from "@hooks/useAccount";
import {getServerSidePropsHandler} from "@utils/ssr";

export const getServerSideProps = getServerSidePropsHandler();
export default function Crypto(): JSX.Element {
	const [ramper] = useState();
	const {isConnected} = useAccount();
	const {t} = useTranslation();

	if (!isConnected)
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
