import React, {useEffect, useState} from "react";
import {useMoralis} from "react-moralis";
import {Box, Center} from "@chakra-ui/react";

import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function Crypto(): JSX.Element {
	const [ramper, setRamper] = useState();
	const {Moralis} = useMoralis();
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
