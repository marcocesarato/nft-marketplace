import {Flex} from "@chakra-ui/react";
import Navbar from "./Navbar";
import Viewport from "@components/Viewport";

export default function Layout({children}) {
	return (
		<Viewport>
			<Navbar />
			<Flex flex="1" flexDirection="column">
				{children}
			</Flex>
		</Viewport>
	);
}
