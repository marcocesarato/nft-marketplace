import React from "react";
import Link from "next/link";
import {Light, Sky} from "@belivvr/aframe-react";
import {SettingsIcon} from "@chakra-ui/icons";
import {IconButton} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {GenericObject} from "@app/types";
import {Environment, MainScene} from "@components/AFrame";
import Content from "@components/Content";
import Loading from "@components/Loading";
import {WallHeight} from "@configs/gallery";
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
				<Environment
					config="
                    preset: starry;
                    grid: none;
                    ground: flat;
                    groundTexture: none;
                    shadow: true;
                    lightPosition: 0 12 0;
                    playArea: 100;"
					position="0 -0.2 0"
				/>

				{/* Light */}
				<Light light={{type: "ambient", castShadow: false}} intensity={0.9}></Light>
				<Light
					id="dirlight"
					shadow-camera-automatic=".navmesh"
					intensity={0.6}
					light={{type: "directional", castShadow: false}}
					position={{x: 0, y: WallHeight / 2, z: 0}}></Light>

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
