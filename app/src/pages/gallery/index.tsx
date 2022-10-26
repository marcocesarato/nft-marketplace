import Link from "next/link";
import {SettingsIcon} from "@chakra-ui/icons";
import {IconButton} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import Content from "@components/Content";
import Gallery from "@components/Gallery";
import Header from "@components/Header";
import Loading from "@components/Loading";
import useAccount from "@hooks/useAccount";
import useUser from "@hooks/useUser";
import {getStaticPropsLocale} from "@utils/i18n";
import {getGalleryBuilderUrl} from "@utils/url";

export const getStaticProps = getStaticPropsLocale;
export default function MyGallery(): JSX.Element {
	const {user, isLoading} = useUser();
	const {isConnected} = useAccount();
	const {t} = useTranslation();
	if (!isConnected)
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

	return (
		<>
			<Gallery user={user} />
			<Link href={getGalleryBuilderUrl()} legacyBehavior>
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
