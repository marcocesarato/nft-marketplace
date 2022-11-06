import {Suspense, useMemo} from "react";
import {useColorModeValue, VStack} from "@chakra-ui/react";
import {BakeShadows} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {DoubleSide} from "three";

import useGallery from "@contexts/Gallery";

import Map from "./Map";

function Map3D(): JSX.Element {
	const {schema} = useGallery();
	const planimetry = schema.getMap();
	const mapHeight = useMemo(() => planimetry.height, [planimetry.height]);
	const mapWidth = useMemo(() => planimetry.width, [planimetry.width]);
	const groundColor = useColorModeValue("#FFF", "#222");

	return (
		<VStack flex={2} height="calc(100vh - 90px)" overflow="none">
			<Canvas
				camera={{
					position: [mapWidth / 2, mapHeight * 2, mapHeight / 2],
					fov: 60,
				}}
				dpr={[1, 2]}>
				<Suspense fallback={null}>
					<Map />
					<mesh
						position={[mapWidth / 2, -0.1, mapWidth / 2]}
						rotation-x={-Math.PI / 2}
						receiveShadow>
						<planeGeometry args={[mapWidth * 10, mapHeight * 10]} attach="geometry" />
						<meshStandardMaterial side={DoubleSide} color={groundColor} />
					</mesh>
					<ambientLight intensity={0.5} />
					<directionalLight
						position={[1, 10, -2]}
						intensity={1}
						shadow-camera-far={70}
						shadow-camera-left={-10}
						shadow-camera-right={10}
						shadow-camera-top={10}
						shadow-camera-bottom={-10}
						shadow-mapSize={[512, 512]}
						castShadow
					/>
					<directionalLight position={[-10, -10, 2]} intensity={3} />
					<BakeShadows />
				</Suspense>
			</Canvas>
		</VStack>
	);
}

export default Map3D;
