import {Alert, AlertIcon, Box, AlertTitle, AlertDescription} from "@chakra-ui/react";

export default function ErrorAlert({error, message}) {
	return (
		<Alert status="error" mb={5}>
			<AlertIcon />
			<Box flex="1">
				<AlertTitle>{error}</AlertTitle>
				<AlertDescription display="block">{message}</AlertDescription>
			</Box>
		</Alert>
	);
}
