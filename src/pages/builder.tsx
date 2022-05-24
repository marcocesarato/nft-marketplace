import Content from "@components/Content";
import GalleryBuilder from "@components/GalleryBuilder";
import {GalleryProvider} from "@contexts/Gallery";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function Builder(): JSX.Element {
	return (
		<Content>
			<GalleryProvider>
				<GalleryBuilder />
			</GalleryProvider>
		</Content>
	);
}
