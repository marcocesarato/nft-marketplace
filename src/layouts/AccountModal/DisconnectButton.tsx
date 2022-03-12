import {Button} from "@chakra-ui/react";

export default function DisconnectButton({onDisconnect}): JSX.Element {
	return (
		<Button
			bg="gray.700"
			color="gray.100"
			_hover={{
				background: "blue.900",
				color: "blue.300",
			}}
			_active={{
				background: "blue.900",
				color: "blue.300",
			}}
			isFullWidth
			onClick={onDisconnect}>
			Disconnect
		</Button>
	);
}
