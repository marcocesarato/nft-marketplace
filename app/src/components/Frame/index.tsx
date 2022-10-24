import {useEffect, useRef, useState} from "react";
import {Image, Text, useCursor} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {Color, MathUtils} from "three";

import {pictureSize} from "@utils/image";

export default function Frame({
	url,
	text = "",
	id = null,
	color = new Color(),
	disableHover = false,
	...props
}): JSX.Element {
	const [hovered, hover] = useState(false);
	const image = useRef();
	const frame = useRef();
	const [ratio, setRatio] = useState(1);
	const [direction, setDirection] = useState("vertical");
	const scaleX = direction === "vertical" ? 1 : ratio;
	const scaleY = direction === "vertical" ? ratio : 1;
	useCursor(hovered);
	useFrame((state) => {
		if (!image?.current || !frame?.current) return;
		const img = image.current as any;
		img.scale.x = MathUtils.lerp(img.scale.x, 0.85 * (hovered ? 0.85 : 1), 0.1);
		img.scale.y = MathUtils.lerp(img.scale.y, 0.9 * (hovered ? 0.905 : 1), 0.1);
		(frame.current as any).material.color.lerp(
			color.set(hovered ? "orange" : "white").convertSRGBToLinear(),
			0.1,
		);
	});
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
			<mesh
				name={id || text}
				onPointerOver={(e) => {
					e.stopPropagation();
					hover(true && !disableHover);
				}}
				onPointerOut={() => hover(false)}
				scale={[scaleX, scaleY, 0.05]}
				position={[0, scaleY / 2, 0]}>
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
