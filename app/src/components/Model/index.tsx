import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export default function Model({src}: {src: string}) {
	const gltf = useLoader(GLTFLoader, src);
	return <primitive object={gltf.scene as any} scale={0.4} />;
}
