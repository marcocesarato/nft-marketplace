import {useMemo, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {Mesh, Vector3} from "three";

export default function MapSpawn({row, column}) {
	const meshRef = useRef();
	const position = useMemo(() => new Vector3(column + 0.5, 0.5, row + 0.5), [row, column]) as any;
	useFrame(({clock}) => {
		const a = clock.getElapsedTime();
		const mesh = meshRef.current as Mesh;
		if (mesh) mesh.rotation.y = a;
	});
	return (
		<mesh ref={meshRef} position={position} castShadow receiveShadow>
			<dodecahedronGeometry args={[0.4, 0]} />
			<meshNormalMaterial />
		</mesh>
	);
}
