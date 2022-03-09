import {Environment, MeshReflectorMaterial} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";

import Frames from "./Frames";

const imagesDisposition = [
	// Front
	{position: [0, 0, 1.5], rotation: [0, 0, 0]},
	// Back
	{position: [-0.8, 0, -0.6], rotation: [0, 0, 0]},
	{position: [0.8, 0, -0.6], rotation: [0, 0, 0]},
	// Left
	{position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0]},
	{position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0]},
	{position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0]},
	// Right
	{position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0]},
	{position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0]},
	{position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0]},
];

export default function Gallery({data}) {
	const images = data.slice(0, imagesDisposition.length).map((nft, i) => {
		return {
			id: `${nft?.token_address}${nft?.token_id}`,
			text: nft.metadata?.name,
			url: nft.metadata?.image,
			position: imagesDisposition[i].position,
			rotation: imagesDisposition[i].rotation,
		};
	});
	return (
		<Canvas gl={{alpha: false}} dpr={[1, 1.5]} camera={{fov: 70, position: [0, 2, 15]}}>
			<color attach="background" args={["#191920"]} />
			<fog attach="fog" args={["#191920", 0, 15]} />
			<Environment preset="city" />
			<group position={[0, -0.5, 0]}>
				<Frames images={images} />
				<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
					<planeGeometry args={[50, 50]} />
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
					/>
				</mesh>
			</group>
		</Canvas>
	);
}
