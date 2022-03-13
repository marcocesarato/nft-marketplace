import {Center} from "@chakra-ui/react";

import Gallery from "@components/Gallery";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useNFTs from "@hooks/useNFTs";
import useSidebar from "@hooks/useSidebar";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function MyGallery(): JSX.Element {
	const {data, error, isError, isSuccess, isLoading} = useNFTs();
	const [isOpenSidebar] = useSidebar();
	if (isError) return <Header title="Error" subtitle={error.message} />;
	if (isLoading) return <Loading />;
	if (isSuccess && !data.length)
		return <Header title="Gallery" subtitle="No items on marketplace." />;

	return (
		<Center
			height="calc(100vh - 94px)"
			width={{
				md: "100vw",
				lg: isOpenSidebar ? "calc(100vw - 100px)" : "calc(100vw - 270px)",
			}}>
			<Gallery data={data} />
		</Center>
	);
}
