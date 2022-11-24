import {Suspense} from "react";
import {Flex} from "@chakra-ui/react";
import {BakeShadows, OrbitControls, Stage} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";

import {TokenItem} from "@app/types";
import Frame from "@components/Frame";
import Model from "@components/Model";
import useIPFS from "@hooks/useIPFS";

export default function Product3D({data}: {data: TokenItem}): JSX.Element {
	const {resolveLink} = useIPFS();
	return (
		<Flex position="relative" height="70vh">
			<Canvas shadows dpr={[1, 2]} camera={{position: [0, 0, 0], fov: 60}}>
				<Suspense fallback={null}>
					<Stage
						environment="city"
						intensity={0.5}
						shadows={{type: "contact", opacity: 0.7, blur: 2}}>
						{data.animation_url ? (
							<Model src={resolveLink(data.animation_url)} />
						) : (
							<Frame
								url={resolveLink(data.image)}
								rotation={[0, 0, 0]}
								position={[0, 0, 0]}
								disableHover={true}
							/>
						)}
					</Stage>
					<BakeShadows />
				</Suspense>
				<OrbitControls makeDefault autoRotate />
			</Canvas>
		</Flex>
	);
}
