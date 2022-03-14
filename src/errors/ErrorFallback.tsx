import {FiChevronDown, FiChevronUp} from "react-icons/fi";
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Collapse,
	useDisclosure,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

export default function ErrorFallback({error}): JSX.Element {
	const {isOpen, onToggle} = useDisclosure();
	const {t} = useTranslation();
	return (
		<Box p="4" m="auto">
			<Alert status="error" borderRadius="md">
				<AlertIcon />
				<Box flex="1">
					<AlertTitle>{t("error:unexpectedError")}</AlertTitle>
					<AlertDescription display="block" lineHeight="1.4">
						<Button
							variant="link"
							color="red.800"
							size="sm"
							rightIcon={isOpen ? <FiChevronUp /> : <FiChevronDown />}
							onClick={onToggle}>
							{t("common:action.showDetails")}
						</Button>
						<Collapse in={isOpen} animateOpacity>
							<Box my={4} fontFamily="monospace">
								{error.message}
							</Box>
						</Collapse>
					</AlertDescription>
				</Box>
			</Alert>
		</Box>
	);
}
