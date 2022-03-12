import {Center} from "@chakra-ui/react";

import Gallery from "@components/Gallery";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useNFTs from "@hooks/useNFTs";

export default function MyGallery(): JSX.Element {
	const {data, error, isError, isSuccess, isLoading} = useNFTs();
	if (isError) return <Header title="Error" subtitle={error.message} />;
	if (isLoading) return <Loading />;
	if (isSuccess && !data.length)
		return <Header title="Gallery" subtitle="No items on marketplace." />;

	return (
		<Center height="calc(100vh - 64px)" width="100vw">
			<Gallery data={data} />
		</Center>
	);
}
