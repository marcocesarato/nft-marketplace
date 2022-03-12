import Link from "next/link";
import {Box, Button, Heading, Img, LightMode, Stack, Text} from "@chakra-ui/react";

export default function Home(): JSX.Element {
	return (
		<Box>
			<Box as="section" py="7.5rem">
				<Box maxW={{base: "xl", md: "5xl"}} mx="auto" px={{base: "6", md: "8"}}>
					<Box textAlign="center">
						<Heading
							as="h1"
							size="3xl"
							fontWeight="extrabold"
							maxW="48rem"
							mx="auto"
							lineHeight="1.2"
							letterSpacing="tight">
							Watch your Digital Art on the wall of your home
						</Heading>
						<Text fontSize="xl" mt="4" maxW="xl" mx="auto">
							Use the VR viewer to see all your NFTs digital art on the wall of your
							home in real time and interact with them.
						</Text>
					</Box>

					<Stack
						justify="center"
						direction={{base: "column", md: "row"}}
						mt="10"
						mb="20"
						spacing="4">
						<LightMode>
							<Link href="/explore" passHref>
								<Button
									size="lg"
									colorScheme="purple"
									px="8"
									fontWeight="bold"
									fontSize="md">
									Explore the marketplace
								</Button>
							</Link>
						</LightMode>
					</Stack>
					<Box
						className="group"
						cursor="pointer"
						position="relative"
						rounded="lg"
						overflow="hidden">
						<Img
							alt="Screenshot"
							src="https://images.unsplash.com/photo-1609423433459-a65b330ef5da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
