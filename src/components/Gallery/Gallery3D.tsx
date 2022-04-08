import {Environment, MeshReflectorMaterial} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";

import Frames from "./Frames";

export default function Gallery3D({data}): JSX.Element {
	return (
		<Canvas gl={{alpha: false}} dpr={[1, 1.5]} camera={{fov: 70, position: [0, 2, 15]}}>
			<color attach="background" args={["#191920"]} />
			<fog attach="fog" args={["#191920", 0, 15]} />
			<Environment preset="city" />
			<group position={[0, -0.5, 0]}>
				<Frames images={data} />
				<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
					<planeGeometry args={[50, 50]} />
					{/* @ts-ignore */}
					<MeshReflectorMaterial
						blur={[300, 100]}
						resolution={2048}
						mixBlur={1}
						mixStrength={40}
						roughness={1}
						depthScale={1.2}
						minDepthThreshold={0.4}
						maxDepthThreshold={1.4}
						color="#101010"
						metalness={0.5}
						mirror={0}
					/>
				</mesh>
			</group>
		</Canvas>
	);
}
