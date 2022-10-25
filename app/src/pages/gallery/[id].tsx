import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

import Content from "@components/Content";
import Gallery from "@components/Gallery";
import Header from "@components/Header";
import Loading from "@components/Loading";
import ErrorNotFound from "@errors/ErrorNotFound";
import {useUserQuery} from "@services/graphql";
import {getServerSidePropsHandler} from "@utils/ssr";

export const getServerSideProps = getServerSidePropsHandler();
export default function AccountGallery(): JSX.Element {
	const {t} = useTranslation();
	const router = useRouter();
	const {id} = router.query;
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
	if (!data?.user?.planimetry)
		return <Header title={"Empty gallery"} subtitle={"No gallery found"} />;

	return <Gallery user={data.user} />;
}
