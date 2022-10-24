import {useEffect} from "react";
import Image from "next/image";
import {Grid, GridItem, Text} from "@chakra-ui/react";
import axios from "axios";

import type {TWeb3Provider} from "@app/types";
import {connectors} from "@configs/connectors";
import useAccount from "@hooks/useAccount";
import useLocalStorage from "@hooks/useLocalStorage";

export default function WalletConnect(): JSX.Element {
	const {authenticate, signature, signatureData, account, isAuthenticated} = useAccount();
	const [, setConnectorId] = useLocalStorage<TWeb3Provider>("connectorId");
	useEffect(() => {
		if (signature && signatureData && account && !isAuthenticated) {
			axios
				.post(`${process.env.NEXT_PUBLIC_URL}/api/login`, {
					message: signatureData,
					account: account,
					signature: signature,
				})
				.then();
		}
	}, [signature, signatureData, account, isAuthenticated]);
	return (
		<Grid templateColumns={"1fr 1fr"} rowGap={5}>
			{connectors.map(({title, icon, connectorId}, key) => {
				return (
					<GridItem
						key={key}
						alignItems="center"
						justifyContent="center"
						flexDirection={"column"}
						display="flex"
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
