import {useMemo} from "react";
import {Vector3} from "three";

export default function BlockWireframe({row, column}) {
	const position = useMemo(
		() => new Vector3(column + 0.5, 0.56, row + 0.5),
		[row, column],
	) as any;

	return (
		<mesh position={position} rotation-x={-Math.PI / 2}>
			<boxGeometry args={[1.1, 1.1, 1.1]} />
			<meshStandardMaterial color={"#00F"} wireframe={true} />
		</mesh>
	);
}
