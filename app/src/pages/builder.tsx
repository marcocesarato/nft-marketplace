import {useTranslation} from "next-i18next";

import Content from "@components/Content";
import GalleryBuilder from "@components/GalleryBuilder";
import Header from "@components/Header";
import {GalleryProvider} from "@contexts/Gallery";
import useAccount from "@hooks/useAccount";
import {getServerSidePropsHandler} from "@utils/ssr";

export const getServerSideProps = getServerSidePropsHandler(["userNFTs"]);
export default function Builder(): JSX.Element {
	const {isConnected} = useAccount();
	const {t} = useTranslation();
	if (!isConnected)
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
