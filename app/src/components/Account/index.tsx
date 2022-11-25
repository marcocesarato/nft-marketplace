import {useRouter} from "next/router";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import {
	Box,
	Flex,
	Heading,
	Image,
	Link,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";
import {useNetwork} from "wagmi";

import Avatar from "@components/Avatar";
import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import ErrorNotFound from "@errors/ErrorNotFound";
import {useUserQuery} from "@services/graphql";
import {formatDate} from "@utils/formatters";
import {getGalleryUrl} from "@utils/url";

import Created from "./Created";
import Favourites from "./Favourites";
import Owned from "./Owned";
import Transfers from "./Transfers";

export {default as Created} from "./Created";
export {default as Favourites} from "./Favourites";
export {default as Owned} from "./Owned";
export {default as Transfers} from "./Transfers";

export type AccountProps = {
	id: string | string[];
};

export default function Account({id}: AccountProps): JSX.Element {
	const {t} = useTranslation();
	const {chain} = useNetwork();
	const router = useRouter();
	const bg = useColorModeValue("white", "gray.800");
	const bgCover = useColorModeValue("gray.300", "gray.900");
	const {data, loading, error} = useUserQuery({
		variables: {
			filter: {
				account: id?.toString(),
			},
		},
	});

	if (loading) {
		return (
			<Content>
				<Loading />
			</Content>
		);
	}
	const user = data?.user;
	if (error) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (!user) return <ErrorNotFound />;

	return (
		<Box flex="1">
			<Box w={"full"} bg={bg}>
				{user.cover ? (
					<Image h={"120px"} w={"full"} src={user.cover} objectFit={"cover"} />
				) : (
					<Box h={"120px"} w={"full"} bg={bgCover} />
				)}
				<Flex justify={"center"} mt={-12}>
					<Avatar
						address={user.account}
						size={150}
						ensImage={user.icon}
						css={{
							border: "2px solid white",
						}}
					/>
				</Flex>

				<Box p={6}>
					<Stack spacing={0} align={"center"} mb={5}>
						<Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
							{user.username || user.account}
						</Heading>
						<Text color={"gray.500"}>Joined at {formatDate(user.created_at)}</Text>
						<Link
							href={`${chain?.blockExplorers?.default.url}/address/${user.account}`}
							isExternal
							color="primary"
							fontSize="sm"
							colorScheme="purple">
							{t<string>("common:action.viewOnExplorer")}
							<ExternalLinkIcon mx="3px" />
						</Link>
					</Stack>

					<Stack direction={"row"} justify={"center"} spacing={6}>
						<Stack spacing={0} align={"center"}>
							<Text fontWeight={600}>{user.likes?.length ?? 0}</Text>
							<Text fontSize={"sm"} color={"gray.500"}>
								Likes
							</Text>
						</Stack>
						<Stack spacing={0} align={"center"}>
							<Text fontWeight={600}>{user.favourites?.length ?? 0}</Text>
							<Text fontSize={"sm"} color={"gray.500"}>
								Favourites
							</Text>
						</Stack>
					</Stack>
					<Tabs
						mt={4}
						isLazy
						colorScheme="purple"
						onChange={(index) => {
							if (index === 4) {
								router.push(getGalleryUrl(user.account));
							}
						}}>
						<TabList>
							<Tab>Owned</Tab>
							<Tab>Created</Tab>
							<Tab>Favourites</Tab>
							<Tab>Activities</Tab>
							<Tab>Gallery</Tab>
						</TabList>

						<TabPanels>
							<TabPanel>
								<Owned address={user.account} />
							</TabPanel>
							<TabPanel>
								<Created address={user.account} />
							</TabPanel>
							<TabPanel>
								<Favourites
									items={user.favourites?.filter((a) => a != null) as number[]}
								/>
							</TabPanel>
							<TabPanel>
								<Transfers address={user.account} />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</Box>
		</Box>
	);
}
