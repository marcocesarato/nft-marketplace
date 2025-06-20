import {useMemo, useRef} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {InstancedMesh} from "three";

function Swarm({count}) {
	const mesh = useRef();
	const light = useRef();

	const dummy = useMemo(() => new THREE.Object3D(), []);
	const particles = useMemo(() => {
		const temp = [];
		for (let i = 0; i < count; i++) {
			const t = Math.random() * 100;
			const factor = 20 + Math.random() * 10;
			const speed = 0.01 + Math.random() / 200;
			const xFactor = -50 + Math.random() * 100;
			const yFactor = -50 + Math.random() * 100;
			const zFactor = -50 + Math.random() * 100;
			temp.push({t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0});
		}
		return temp;
	}, [count]);
	useFrame((state) => {
		if (!light?.current || !mesh?.current) return;
		particles.forEach((particle, i) => {
			let {t} = particle;
			const {factor, speed, xFactor, yFactor, zFactor} = particle;
			t += particle.t += speed / 2;
			const s = Math.cos(t);
			dummy.position.set(
				xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
				yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
				zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10,
			);
			dummy.scale.set(s, s, s);
			dummy.rotation.set(s * 5, s * 5, s * 5);
			dummy.updateMatrix();
			// And apply the matrix to the instanced item
			(mesh.current as InstancedMesh).setMatrixAt(i, dummy.matrix);
		});
		(mesh.current as InstancedMesh).instanceMatrix.needsUpdate = true;
	});
	return (
		<>
			<pointLight ref={light} distance={40} intensity={8} color="lightblue" />
			<instancedMesh ref={mesh} args={[null, null, count]}>
				<sphereGeometry args={[0.2, 0]} />
				<meshPhongMaterial color="#805ad5" />
			</instancedMesh>
		</>
	);
}

export default function Particles({style = {}}) {
	return (
		<>
			<Canvas camera={{fov: 100, position: [0, 0, 30]}} style={style}>
				<fog args={["#805ad5", 50, 190]} />
				<pointLight distance={100} intensity={4} color="white" />
				<Swarm count={500} />
			</Canvas>
		</>
	);
}
