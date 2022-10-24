import {useTranslation} from "next-i18next";

import Content from "@components/Content";
import GalleryBuilder from "@components/GalleryBuilder";
import Header from "@components/Header";
import {GalleryProvider} from "@contexts/Gallery";
import {useConfig} from "@contexts/Global";
import {getServerSidePropsSession} from "@utils/ssr";

export const getServerSideProps = getServerSidePropsSession;
export default function Builder(): JSX.Element {
	const {isLoggedSession} = useConfig();
	const {t} = useTranslation();
	if (!isLoggedSession)
		return (
			<Header title={t<string>("error:title")} subtitle={t<string>("error:auth.required")} />
		);
	return (
		<Content>
			<GalleryProvider>
				<GalleryBuilder />
			</GalleryProvider>
		</Content>
	);
}
