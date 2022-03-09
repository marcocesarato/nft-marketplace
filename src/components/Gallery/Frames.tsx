import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {Quaternion, Vector3} from "three";

import Frame, {GOLDENRATIO} from "./Frame";

export default function Frames({images, q = new Quaternion(), p = new Vector3()}) {
	const ref = useRef();
	const clicked = useRef();
	const [item, setItem] = useState(null);
	useEffect(() => {
		clicked.current = ref.current.getObjectByName(item);
		if (clicked.current) {
			clicked.current.parent.updateWorldMatrix(true, true);
			clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
			clicked.current.parent.getWorldQuaternion(q);
		} else {
			p.set(0, 0, 5.5);
			q.identity();
		}
	});
	useFrame((state, dt) => {
		state.camera.position.lerp(p, 0.025);
		state.camera.quaternion.slerp(q, 0.025);
	});
	return (
		<group
			ref={ref}
			onClick={(e) => {
				e.stopPropagation();
				setItem(e.object.name);
			}}
			onPointerMissed={() => setItem(null)}>
			{images.map((props) => <Frame key={props.id} {...props} /> /* prettier-ignore */)}
		</group>
	);
}
