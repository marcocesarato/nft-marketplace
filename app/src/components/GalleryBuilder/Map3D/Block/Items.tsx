import {useMemo, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {Mesh, Vector3} from "three";

export default function BlockItems({row, column, isFloor = false}) {
	const meshRef = useRef();
	const position = useMemo(
		() => new Vector3(column + 0.5, isFloor ? 0.5 : 1.5, row + 0.5),
		[row, column, isFloor],
	) as any;
	useFrame(({clock}) => {
		const a = clock.getElapsedTime();
		const mesh = meshRef.current as Mesh;
		if (mesh) mesh.rotation.y = a;
	});
	return (
		<mesh ref={meshRef} position={position}>
			<sphereGeometry args={[0.25, 0]} />
			<meshNormalMaterial />
		</mesh>
	);
}
