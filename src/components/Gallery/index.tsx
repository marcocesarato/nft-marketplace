import React from "react";
import {Light, Sky} from "@belivvr/aframe-react";

import {Environment, MainCamera, MainScene} from "@components/AFrame";
import Content from "@components/Content";
import Loading from "@components/Loading";
import useAFrame from "@hooks/useAFrame";

export default function Gallery(): JSX.Element {
	const {isLoading} = useAFrame();

	if (!isLoading) {
		return (
			<Content>
				<Loading />
			</Content>
		);
	}

	return (
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
			<MainCamera />
		</MainScene>
	);
}
