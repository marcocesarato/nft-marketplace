import {Suspense} from "react";
import {Flex} from "@chakra-ui/react";
import {BakeShadows, MeshReflectorMaterial, OrbitControls, Stage} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";

import {TokenItem} from "@app/types";
import Frame from "@components/Frame";
import Model from "@components/Model";
import useIPFS from "@hooks/useIPFS";

export default function Viewer3D({data}: {data: TokenItem}): JSX.Element {
	const {resolveLink} = useIPFS();
	return (
		<Flex position="relative" height="70vh">
			<Canvas dpr={[1, 1.5]} camera={{position: [0, 0, 15], fov: 25}}>
				<Suspense fallback={null}>
					<Stage
						intensity={0.5}
						environment="city"
						shadows={{type: "contact", opacity: 0.7, blur: 2}}>
						{data.animation_url ? (
							<Model src={resolveLink(data.animation_url)} />
						) : (
							<Frame
								url={resolveLink(data.image)}
								rotation={[0, 0, 0]}
								position={[0, 0, 0]}
							/>
						)}
						<OrbitControls
							enablePan={false}
							minPolarAngle={Math.PI / 2.2}
							maxPolarAngle={Math.PI / 2.2}
						/>
					</Stage>
					<BakeShadows />
				</Suspense>
			</Canvas>
		</Flex>
	);
}
