import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {Group, Quaternion, Vector3} from "three";

import Frame from "@components/Frame";

export default function Frames({images, q = new Quaternion(), p = new Vector3()}): JSX.Element {
	const ref = useRef();
	const [item, setItem] = useState(null);
	useEffect(() => {
		if (!ref?.current) return;
		const reference = ref?.current as Group;
		const clicked = reference.getObjectByName(item);
		if (clicked) {
			clicked.parent.updateWorldMatrix(true, true);
			clicked.parent.localToWorld(p.set(0, 1 /* Ratio adjust */ / 2, 1.25));
			clicked.parent.getWorldQuaternion(q);
		} else {
			p.set(0, 0, 5.5);
			q.identity();
		}
	});
	useFrame((state) => {
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
