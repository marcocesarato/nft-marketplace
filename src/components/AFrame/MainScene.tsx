import React, {useRef} from "react";
import {Scene} from "@belivvr/aframe-react";

export default function MainScene(props): JSX.Element {
	const scene = useRef();

	/*useEffect(() => {
		if (scene.current) {
			const canvas = (scene.current as Element).querySelector("canvas");
			canvas?.setAttribute("tabindex", "0");
		}
	}, [scene]);*/

	return (
		<div id="main-scene" ref={scene} style={{position: "relative"}}>
			<Scene
				fog={{type: "linear", color: "#000", far: 30, near: 10}}
				background={{color: "skyblue"}}
				renderer={{
					alpha: true,
					antialias: true,
					highRefreshRate: true,
					colorManagement: true,
					exposure: 2,
					toneMapping: "ACESFilmic",
				}}
				shadow={{type: "pcfsoft"}}
				physx="autoLoad: true; delay: 1000; wasmUrl: https://stemkoski.github.io/A-Frame-Examples/js/physx.release.wasm; useDefaultScene: false;"
				raycaster="objects: a-sphere"
				loading-screen="dotsColor: #000; backgroundColor: #FFF"
				deviceOrientationPermissionUI={{enabled: true}}
				networked-scene={`
                    serverURL: ${process.env.NEXT_PUBLIC_URL}/api/socket;
                    audio: true;
                    room: nametag;
                    debug: true;
                    adapter: socketio;
                `}
				{...props}
			/>
		</div>
	);
}
