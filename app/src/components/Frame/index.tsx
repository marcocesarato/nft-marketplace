import {useEffect, useRef, useState} from "react";
import {Image, Text} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {MathUtils} from "three";

import {pictureSize} from "@utils/image";

export default function Frame({url, text = "", id = null, ...props}): JSX.Element {
	const image = useRef();
	const [ratio, setRatio] = useState(1);
	const [direction, setDirection] = useState("vertical");
	const scaleX = direction === "vertical" ? 1 : ratio;
	const scaleY = direction === "vertical" ? ratio : 1;
	useEffect(() => {
		const loadPicture = async () => {
			const s = await pictureSize(url);
			if (s.width > s.height) {
				setRatio(s.width / s.height);
				setDirection("horizontal");
			} else {
				setRatio(s.height / s.width);
				setDirection("vertical");
			}
		};
		loadPicture();
	}, [url]);
	useFrame((state) => {
		if (!image?.current) return;
		const img = image.current as any;
		img.scale.y = MathUtils.lerp(img.scale.x, 0.95, 0.1);
		img.scale.x = MathUtils.lerp(img.scale.y, 0.95, 0.1);
	});
	return (
		<group {...props}>
			<mesh raycast={() => null} scale={[scaleX, scaleY, 0.05]} position={[0, scaleY / 2, 0]}>
				<boxGeometry />
				<meshStandardMaterial
					color="#151515"
					metalness={0.5}
					roughness={0.5}
					envMapIntensity={2}
				/>
				<Image raycast={() => null} ref={image} position={[0, 0, 0.51]} url={url} />
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
