import Link from "next/link";
import {SettingsIcon} from "@chakra-ui/icons";
import {IconButton} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Gallery from "@components/Gallery";
import {getStaticPropsLocale} from "@utils/i18n";

export const getStaticProps = getStaticPropsLocale;
export default function MyGallery(): JSX.Element {
	const {t} = useTranslation();

	return (
		<>
			<Gallery />
			<Link href="/builder">
				<IconButton
					colorScheme="purple"
					aria-label={t<string>("common:page.gallery.builder.title")}
					position="fixed"
					top="130px"
					right="25px"
					size="lg"
					icon={<SettingsIcon />}
				/>
			</Link>
		</>
	);
}
