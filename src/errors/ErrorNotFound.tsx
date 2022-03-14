import NextLink from "next/link";
import {Box, Button, Center, Heading, Text} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

export default function ErrorNotFound(): JSX.Element {
	const {t} = useTranslation();
	return (
		<Center flex="1" p="8">
			<Box textAlign="center" py={10} px={6}>
				<Heading display="inline-block" as="h2" fontSize="10rem">
					404
				</Heading>
				<Text fontSize="2rem" fontWeight="bold" mt={3} mb={2}>
					{t("error:notFound.title")}
				</Text>
				<Text color={"gray.500"} mb={6}>
					{t("error:notFound.message")}
				</Text>

				<NextLink href={"/"} passHref>
					<Button>{t("common:action.goToHome")}</Button>
				</NextLink>
			</Box>
		</Center>
	);
}
