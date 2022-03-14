import {Center} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Gallery from "@components/Gallery";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useNFTs from "@hooks/useNFTs";
import useSidebar from "@hooks/useSidebar";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function MyGallery(): JSX.Element {
	const {t} = useTranslation();
	const {data, error, isError, isSuccess, isLoading} = useNFTs();
	const [isOpenSidebar] = useSidebar();
	if (isError) return <Header title={t("error:title")} subtitle={error.message} />;
	if (isLoading) return <Loading />;
	if (isSuccess && !data.length)
		return (
			<Header
				title={t("common:page.gallery.title")}
				subtitle={t("common:page.gallery.empty")}
			/>
		);

	return (
		<Center
			height="calc(100vh - 94px)"
			width={{
				md: "100vw",
				lg: !isOpenSidebar ? "calc(100vw - 100px)" : "calc(100vw - 270px)",
			}}>
			<Gallery data={data} />
		</Center>
	);
}
