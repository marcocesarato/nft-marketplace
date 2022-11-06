import React from "react";
import {useDrag} from "@use-gesture/react";
import {DoubleSide} from "three";

export default function Ground({setIsDragging, width, height, onClick, onMove}) {
	const bind = useDrag(({active, timeStamp, down, event}) => {
		setIsDragging(active);
		return timeStamp;
	}) as any;

	return (
		<mesh
			{...bind()}
			position={[width / 2, 0, height / 2]}
			rotation-x={-Math.PI / 2}
			onClick={onClick}
			onPointerMove={onMove}>
			<planeGeometry args={[width, height]} attach="geometry" />
			<meshBasicMaterial side={DoubleSide} visible={false} />
		</mesh>
	);
}
