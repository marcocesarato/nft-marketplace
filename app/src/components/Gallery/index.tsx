import {useEffect} from "react";
import {Light} from "@belivvr/aframe-react";

import {GenericObject} from "@app/types";
import {Environment, MainScene} from "@components/AFrame";
import Content from "@components/Content";
import Loading from "@components/Loading";
import {EnvironmentMaps, WallSize} from "@configs/gallery";
import {GalleryProvider} from "@contexts/Gallery";
import useAFrame from "@hooks/useAFrame";

import Map from "./Map";

type GalleryProps = {
	user: GenericObject;
};

export default function Gallery({user}: GalleryProps): JSX.Element {
	const {isLoading} = useAFrame();

	useEffect(() => {
		const onMouseDown = () => (global.dragging = false);
		const onMouseMove = () => (global.dragging = true);
		document.addEventListener("mousedown", onMouseDown);
		document.addEventListener("mousemove", onMouseMove);
		return () => {
			document.removeEventListener("mousedown", onMouseDown);
			document.removeEventListener("mousemove", onMouseMove);
		};
	}, []);

	if (!isLoading) {
		return (
			<Content>
				<Loading />
			</Content>
		);
	}

	return (
		<GalleryProvider>
			<MainScene room={user.account}>
				{/* Sky */}
				<Environment config={EnvironmentMaps.forest} position="0 -1 0" />

				{/* Light */}
				<Light light={{type: "ambient"}} intensity={0.5}></Light>
				<Light
					id="dirlight"
					intensity={0.8}
					light={{type: "point", castShadow: true}}
					position={{x: -1, y: WallSize, z: -1}}></Light>

				<Map planimetry={user?.planimetry} />
			</MainScene>
		</GalleryProvider>
	);
}
