import {Box, Heading, Text, Button, Center} from "@chakra-ui/react";
import NextLink from "next/link";
export default function ErrorNotFound() {
	return (
		<Center flex="1" p="8">
			<Box textAlign="center" py={10} px={6}>
				<Heading display="inline-block" as="h2" fontSize="10rem">
					404
				</Heading>
				<Text fontSize="2rem" fontWeight="bold" mt={3} mb={2}>
					Page Not Found
				</Text>
				<Text color={"gray.500"} mb={6}>
					The page you're looking for does not seem to exist
				</Text>

				<NextLink href={"/"} passHref>
					<Button>Go to Home</Button>
				</NextLink>
			</Box>
		</Center>
	);
}
