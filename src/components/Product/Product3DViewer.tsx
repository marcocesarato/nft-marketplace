import {Suspense} from "react";
import {BakeShadows, OrbitControls, Stage} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";

import Frame from "@components/Gallery/Frame";

export default function Product3DViewer({data}): JSX.Element {
	return (
		<Canvas shadows dpr={[1, 2]} camera={{position: [0, 0, 0], fov: 60}}>
			<Suspense fallback={null}>
				<Stage environment="city" intensity={0.5} contactShadow={{opacity: 0.7, blur: 2}}>
					<Frame
						url={data.image}
						text={data.name}
						rotation={[0, 0, 0]}
						position={[0, 0, 0]}
						disableHover={true}
					/>
				</Stage>
				<BakeShadows />
			</Suspense>
			<OrbitControls makeDefault autoRotate />
		</Canvas>
	);
}
