import dynamic from "next/dynamic";
import {Box, useColorModeValue} from "@chakra-ui/react";

const OnramperWidget = dynamic(() => import("@onramper/widget"), {ssr: false});

export default function BuyCrypto() {
	const darkMode = useColorModeValue(false, true);

	return (
		<Box width="482px" height="660px">
			<OnramperWidget API_KEY={process.env.NEXT_PUBLIC_ONRAMPER_SECRET} darkMode={darkMode} />
		</Box>
	);
}
