import React, {useEffect, useRef} from "react";
import {Scene} from "@belivvr/aframe-react";

export default function MainScene(props): JSX.Element {
	const scene = useRef();

	useEffect(() => {
		if (scene.current) {
			const canvas = (scene.current as Element).querySelector("canvas");
			canvas?.setAttribute("tabindex", "0");
		}
	}, [scene]);

	return (
		<div id="main-scene" ref={scene} style={{position: "relative"}}>
			<Scene
				fog={{type: "linear", color: "#000", far: 50, near: 10}}
				background={{color: "skyblue"}}
				renderer={{alpha: true, antialias: true}}
				shadow={{type: "pcfsoft"}}
				gltfModel={{
					dracoDecoderPath:
						"https://cdn.jsdelivr.net/npm/three@0.129.0/examples/js/libs/draco/gltf/",
				}}
				physx="autoLoad: true; delay: 1000; wasmUrl: https://stemkoski.github.io/A-Frame-Examples/js/physx.release.wasm; useDefaultScene: false;"
				raycaster="objects: Sphere"
				loading-screen="dotsColor: #000; backgroundColor: #FFF"
				deviceOrientationPermissionUI={{enabled: true}}
				{...props}
			/>
		</div>
	);
}
