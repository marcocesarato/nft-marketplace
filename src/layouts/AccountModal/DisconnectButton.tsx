import {Button} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

export default function DisconnectButton({onDisconnect}): JSX.Element {
	const {t} = useTranslation();
	return (
		<Button
			bg="gray.700"
			color="gray.100"
			_hover={{
				background: "purple.900",
				color: "purple.300",
			}}
			_active={{
				background: "purple.900",
				color: "purple.300",
			}}
			isFullWidth
			onClick={onDisconnect}>
			{t("common:action.disconnect")}
		</Button>
	);
}
