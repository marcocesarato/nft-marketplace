import {Flex} from "@chakra-ui/react";

import Viewport from "@components/Viewport";

import Navbar from "../Navbar";

export default function Main({children}): JSX.Element {
	return (
		<Viewport>
			<Navbar />
			<Flex flex="1" flexDirection="column">
				{children}
			</Flex>
		</Viewport>
	);
}
