import {Button} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

export default function DisconnectButton({onDisconnect}): JSX.Element {
	const {t} = useTranslation();
	const inverseColors = {
		background: "purple.300",
		color: "purple.900",
	};
	return (
		<Button
			bg="gray.700"
			color="gray.100"
			_hover={inverseColors}
			_active={inverseColors}
			isFullWidth
			onClick={onDisconnect}>
			{t("common:action.disconnect")}
		</Button>
	);
}
