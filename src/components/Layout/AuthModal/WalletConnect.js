import {Grid, GridItem, Text} from "@chakra-ui/react";
import Image from "next/image";

import {connectors} from "@configs/connectors";
import useAccount from "@hooks/useAccount";
import useLocalStorage from "@hooks/useLocalStorage";
import useWeb3 from "@hooks/useWeb3";

export default function WalletConnect({onClose}) {
	const {authenticate} = useAccount();
	const {enableWeb3} = useWeb3();
	const [, setConnectorId] = useLocalStorage("connectorId");
	return (
		<Grid templateColumns={"1fr 1fr"} rowGap={5}>
			{connectors.map(({title, icon, connectorId}, key) => {
				return (
					<GridItem
						key={key}
						alignItems="center"
						justifyContent="center"
						flexDirection={"column"}
						d="flex"
						p={4}
						mx="auto"
						cursor="pointer"
						onClick={async () => {
							try {
								setConnectorId(connectorId);
								await authenticate({
									provider: connectorId,
									signingMessage: "Authenticate",
								});
								await enableWeb3({provider: connectorId});
								//onClose && onClose();
							} catch (e) {
								console.error(e);
							}
						}}>
						<Image src={icon} alt={title} height={50} width={50} />
						<Text fontSize="lg" fontWeight={700} mt={4}>
							{title}
						</Text>
					</GridItem>
				);
			})}
		</Grid>
	);
}
