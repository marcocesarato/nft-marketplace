import React from "react";
import Link from "next/link";
import {Light} from "@belivvr/aframe-react";
import {SettingsIcon} from "@chakra-ui/icons";
import {IconButton} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {GenericObject} from "@app/types";
import {Environment, MainScene} from "@components/AFrame";
import Content from "@components/Content";
import Loading from "@components/Loading";
import {EnvironmentMaps} from "@configs/gallery";
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
				<Environment config={EnvironmentMaps.night} position="0 -1 0" />

				{/* Light */}
				<Light light={{type: "ambient"}} intensity={0.8}></Light>
				<Light
					id="dirlight"
					intensity={0.8}
					light={{type: "directional", castShadow: true}}
					position={{x: -1, y: 1, z: -1}}></Light>

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
