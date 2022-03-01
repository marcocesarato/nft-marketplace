import React, {useState, useEffect} from "react";
import {useMoralis} from "react-moralis";
import {Center} from "@chakra-ui/react";

export default function Crypto() {
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
			<iframe
				src={ramper}
				title="ramper"
				frameBorder="no"
				allow="accelerometer; autoplay; camera; gyroscope; payment;"
				style={{
					width: "420px",
					height: "625px",
					boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
					border: "1px solid #e7eaf3",
					borderRadius: "1rem",
					backgroundColor: "white",
				}}
			/>
		</Center>
	);
}
