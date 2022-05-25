import React from "react";
import Link from "next/link";
import {SettingsIcon} from "@chakra-ui/icons";
import {IconButton} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {GenericObject} from "@app/types";
import {MainScene} from "@components/AFrame";
import Content from "@components/Content";
import Loading from "@components/Loading";
import {GalleryProvider} from "@contexts/Gallery";
import useAFrame from "@hooks/useAFrame";

import Map from "./Map";

type GalleryProps = {
	user: GenericObject;
};

export default function Gallery({user}: GalleryProps): JSX.Element {
	const {isLoading} = useAFrame();
	const {t} = useTranslation();

	if (!isLoading) {
		return (
			<Content>
				<Loading />
			</Content>
		);
	}

	return (
		<GalleryProvider>
			<MainScene>
				{/* Sky */}
				<a-sky id="sky" color="#0000ff"></a-sky>

				{/* Light */}
				<a-light light="type:ambient;castShadow:false" intensity="0.4"></a-light>
				<a-light
					id="dirlight"
					shadow-camera-automatic=".navmesh"
					intensity="0.6"
					light="castShadow:true;type:directional"
					position="0 15 -6"></a-light>

				<Map planimetry={user?.planimetry} />
			</MainScene>
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
		</GalleryProvider>
	);
}
