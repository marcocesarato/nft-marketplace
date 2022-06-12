import {
	Avatar,
	Box,
	Flex,
	Heading,
	Image,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import JazzAvatar from "@components/Avatar";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import ErrorNotFound from "@errors/ErrorNotFound";
import {useUserQuery} from "@services/graphql";
import {formatDate} from "@utils/formatters";

import Created from "./Created";
import Favourites from "./Favourites";
import Owned from "./Owned";

export default function Account({id}): JSX.Element {
	const {t} = useTranslation();
	const {data, loading, error} = useUserQuery({
		variables: {
			filter: {
				account: id.toString(),
			},
		},
	});
	const user = data?.user;

	if (loading) {
		return (
			<Content>
				<Loading />
			</Content>
		);
	}
	if (error) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (!user) return <ErrorNotFound />;

	return (
		<Box flex="1">
			<Box w={"full"} bg={mode("white", "gray.800")}>
				{user.cover ? (
					<Image h={"120px"} w={"full"} src={user.cover} objectFit={"cover"} />
				) : (
					<Box h={"120px"} w={"full"} bg={mode("gray.300", "gray.900")} />
				)}
				<Flex justify={"center"} mt={-12}>
					{user.icon ? (
						<Avatar
							w={150}
							h={150}
							src={user.icon}
							css={{
								border: "2px solid white",
							}}
						/>
					) : (
						<JazzAvatar address={user.account} size={150} />
					)}
				</Flex>

				<Box p={6}>
					<Stack spacing={0} align={"center"} mb={5}>
						<Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
							{user.username || user.account}
						</Heading>
						<Text pt={4} color={"gray.500"}>
							Joined at {formatDate(user.createdAt)}
						</Text>
					</Stack>

					<Stack direction={"row"} justify={"center"} spacing={6}>
						<Stack spacing={0} align={"center"}>
							<Text fontWeight={600}>{user.likes.length}</Text>
							<Text fontSize={"sm"} color={"gray.500"}>
								Likes
							</Text>
						</Stack>
						<Stack spacing={0} align={"center"}>
							<Text fontWeight={600}>{user.favourites.length}</Text>
							<Text fontSize={"sm"} color={"gray.500"}>
								Favourites
							</Text>
						</Stack>
					</Stack>
					<Tabs isLazy>
						<TabList>
							<Tab>Owned</Tab>
							<Tab>Created</Tab>
							<Tab>Favourites</Tab>
							<Tab>Activities</Tab>
						</TabList>

						<TabPanels>
							<TabPanel>
								<Owned address={user.account} />
							</TabPanel>
							<TabPanel>
								<Created address={user.account} />
							</TabPanel>
							<TabPanel>
								<Favourites items={user.favourites} />
							</TabPanel>
							<TabPanel></TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</Box>
		</Box>
	);
}
