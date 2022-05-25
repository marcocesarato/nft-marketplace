import Content from "@components/Content";
import Gallery from "@components/Gallery";
import Loading from "@components/Loading";
import useUser from "@hooks/useUser";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function MyGallery(): JSX.Element {
	const {user, isLoading} = useUser();

	if (isLoading) {
		return (
			<Content>
				<Loading />
			</Content>
		);
	}

	return <Gallery user={user} />;
}
