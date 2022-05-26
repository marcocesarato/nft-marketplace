import {useTranslation} from "next-i18next";

import Content from "@components/Content";
import Gallery from "@components/Gallery";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useAccount from "@hooks/useAccount";
import useUser from "@hooks/useUser";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function MyGallery(): JSX.Element {
	const {user, isLoading} = useUser();
	const {isAuthenticated} = useAccount();
	const {t} = useTranslation();
	if (!isAuthenticated)
		return (
			<Header title={t<string>("error:title")} subtitle={t<string>("error:auth.required")} />
		);

	if (isLoading) {
		return (
			<Content>
				<Loading />
			</Content>
		);
	}

	return <Gallery user={user} />;
}
