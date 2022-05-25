import React, {useEffect} from "react";
import Link from "next/link";
import {Light, Sky} from "@belivvr/aframe-react";
import {SettingsIcon} from "@chakra-ui/icons";
import {IconButton} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";

import {GenericObject, PlanimetryMap} from "@app/types";
import {Environment, MainCamera, MainScene} from "@components/AFrame";
import Content from "@components/Content";
import Loading from "@components/Loading";
import {CameraHeight} from "@configs/gallery";
import useGallery, {GalleryProvider} from "@contexts/Gallery";
import useAFrame from "@hooks/useAFrame";

import Map from "./Map";

type GalleryProps = {
	user: GenericObject;
};

export default function Gallery({user}: GalleryProps): JSX.Element {
	const {isLoading} = useAFrame();
	const {setPlanimetry} = useGallery();
	const {t} = useTranslation();

	useEffect(() => {
		if (!isLoading && user?.planimetry && Object.keys(user?.planimetry).length > 0) {
			setPlanimetry(user.planimetry as PlanimetryMap);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, isLoading]);

	if (!isLoading) {
		return (
			<Content>
				<Loading />
			</Content>
		);
	}

	return (
		<>
			<MainScene>
				{/* Environment */}
				<Environment config="preset: forest; grid: cross"></Environment>

				{/* Sky */}
				<Sky id="sky" color="#0000ff"></Sky>

				{/* Light */}
				<Light light={{type: "ambient", castShadow: false}} intensity={0.4}></Light>
				<Light
					id="dirlight"
					shadow-camera-automatic=".navmesh"
					intensity={0.6}
					light={{castShadow: true, type: "directional"}}
					position={{x: 0, y: 15, z: -6}}></Light>

				{/* Camera */}
				<MainCamera userHeight={CameraHeight} />

				<GalleryProvider>
					<Map />
				</GalleryProvider>
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
		</>
	);
}
