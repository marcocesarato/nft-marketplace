import {Text, Grid, GridItem} from "@chakra-ui/react";
import Image from "next/image";
import {connectors} from "@configs/connectors";
import useAccount from "@hooks/useAccount";

function AuthenticationModal({...props}) {
	const {authenticate, enableWeb3} = useAccount();
	return (
		<Grid templateColumns={"1fr 1fr"} rowGap={5}>
			{connectors.map(({title, icon, connectorId}, key) => (
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
							await authenticate({
								provider: connectorId,
								signingMessage: "Authenticate",
							});
							await enableWeb3({provider: connectorId});
							window.localStorage.setItem("connectorId", connectorId);
							props?.onClose();
						} catch (e) {
							console.error(e);
						}
					}}>
					<Image src={icon} alt={title} height={50} width={50} />
					<Text fontSize="lg" fontWeight={700} mt={4}>
						{title}
					</Text>
				</GridItem>
			))}
		</Grid>
	);
}

export default AuthenticationModal;
