import {Center} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Gallery from "@components/Gallery";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useNFTs from "@hooks/useNFTs";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function MyGallery(): JSX.Element {
	const {t} = useTranslation();
	const {data, error, isError, isSuccess, isLoading} = useNFTs();
	if (isError) return <Header title={t<string>("error:title")} subtitle={error.message} />;
	if (isLoading) return <Loading />;
	if (isSuccess && !data.length)
		return (
			<Header
				title={t<string>("common:page.gallery.title")}
				subtitle={t<string>("common:page.gallery.empty")}
			/>
		);

	return (
		<Center height="calc(100vh - 94px)" w="full">
			<Gallery data={data} />
		</Center>
	);
}
