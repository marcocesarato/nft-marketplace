import {useRouter} from "next/router";
import {GetStaticPaths} from "next/types";
import {Center, Heading} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Content from "@components/Content";
import Header from "@components/Header";
import Loading from "@components/Loading";
import ErrorNotFound from "@errors/ErrorNotFound";
import {useUserQuery} from "@services/graphql";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function Account(): JSX.Element {
	const {t} = useTranslation();
	const router = useRouter();
	const {id} = router.query;
	const {data, loading, error} = useUserQuery({
		variables: {
			filter: {
				_id: id,
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
		<Center flex="1" p="8">
			<Heading>Account {user.username || user.account}</Heading>
		</Center>
	);
}

export const getStaticPaths: GetStaticPaths<{slug: string}> = async () => {
	return {
		paths: [],
		fallback: "blocking",
	};
};
