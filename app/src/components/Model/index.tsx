import {useLayoutEffect} from "react";
import {useGLTF} from "@react-three/drei";

export default function Model({src}: {src: string}) {
	const {scene} = useGLTF(src) as any;
	useLayoutEffect(() => {
		scene.traverse((obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true));
	});
	return <primitive object={scene} />;
}
