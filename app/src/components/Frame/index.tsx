import {useEffect, useRef, useState} from "react";
import {Image, Text} from "@react-three/drei";
import {Color} from "three";

import {pictureSize} from "@utils/image";

export default function Frame({
	url,
	text = "",
	id = null,
	color = new Color(),
	disableHover = false,
	...props
}): JSX.Element {
	const image = useRef();
	const frame = useRef();
	const [ratio, setRatio] = useState(1);
	const [direction, setDirection] = useState("vertical");
	const scaleX = direction === "vertical" ? 1 : ratio;
	const scaleY = direction === "vertical" ? ratio : 1;
	useEffect(() => {
		const loadPicture = async () => {
			const sizes = await pictureSize(url);
			if (sizes.width > sizes.height) {
				setRatio(sizes.width / sizes.height);
				setDirection("horizontal");
			} else {
				setRatio(sizes.height / sizes.width);
				setDirection("vertical");
			}
		};
		loadPicture();
	}, [url]);

	return (
		<group {...props}>
			<mesh name={id || text} scale={[scaleX, scaleY, 0.05]} position={[0, scaleY / 2, 0]}>
				<boxGeometry />
				<meshStandardMaterial
					color="#151515"
					metalness={0.5}
					roughness={0.5}
					envMapIntensity={2}
				/>
				<mesh
					ref={frame}
					raycast={() => null}
					scale={[0.9, 0.93, 0.9]}
					position={[0, 0, 0.2]}>
					<boxGeometry />
					<meshBasicMaterial toneMapped={false} fog={false} />
				</mesh>
				<Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
			</mesh>
			{text && (
				<Text
					maxWidth={0.1}
					anchorX="left"
					anchorY="top"
					position={[scaleX / 1.8, scaleY, 0]}
					fontSize={0.025}>
					{text}
				</Text>
			)}
		</group>
	);
}
