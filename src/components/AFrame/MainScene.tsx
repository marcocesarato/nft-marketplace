import React, {useRef} from "react";
import {Scene} from "@belivvr/aframe-react";
import {Box} from "@chakra-ui/react";

export default function MainScene({room, ...props}): JSX.Element {
	const scene = useRef();

	/*useEffect(() => {
		if (scene.current) {
			const canvas = (scene.current as Element).querySelector("canvas");
			canvas?.setAttribute("tabindex", "0");
		}
	}, [scene]);*/

	return (
		<Box id="main-scene" ref={scene} style={{position: "relative"}}>
			<Box id="rpm-container">
				<iframe
					id="rpm-container-iframe"
					src="https://8thwall.readyplayer.me/avatar"
					allow="camera *; microphone *"
					title="Ready Player Me"
					style={{
						zIndex: 999,
						display: "block",
						position: "absolute",
						width: "100%",
						height: "100%",
					}}></iframe>
			</Box>
			<Scene
				fog={{type: "linear", color: "#000", far: 30, near: 10}}
				background={{color: "skyblue"}}
				renderer={{
					alpha: true,
					antialias: true,
					highRefreshRate: true,
					colorManagement: true,
				}}
				shadow={{type: "pcfsoft"}}
				physx="autoLoad: true; delay: 1000; wasmUrl: https://stemkoski.github.io/A-Frame-Examples/js/physx.release.wasm; useDefaultScene: false;"
				raycaster="objects: [html]; interval:100;"
				loading-screen="dotsColor: #000; backgroundColor: #FFF"
				deviceOrientationPermissionUI={{enabled: true}}
				networked-scene={
					`serverURL: ${process.env.NEXT_PUBLIC_URL}/api/socket;` +
					/*audio: true;*/
					`room: ${room};
                    adapter: socketio;
                    connectOnLoad: true;`
				}
				{...props}
			/>
		</Box>
	);
}
