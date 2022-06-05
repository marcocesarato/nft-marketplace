import {Entity} from "@belivvr/aframe-react";

import {WallHeight} from "@/src/configs/gallery";
import {PlanimetryBlock} from "@app/types";

import Wall from "./Wall";

type WindowProps = {
	position?: {x: number; y: number; z: number};
	neighbors: PlanimetryBlock[];
	[key: string]: any;
};

export default function Window({position, neighbors, ...props}: WindowProps): JSX.Element {
	const height = WallHeight / 5;
	const positionTop = {x: position.x, y: WallHeight - height / 2, z: position.z};
	const positionBottom = {x: position.x, y: height / 2, z: position.z};
	return (
		<Entity>
			<Wall position={positionTop} height={height} neighbors={neighbors} {...props} />
			<Wall position={positionBottom} height={height} neighbors={neighbors} {...props} />
		</Entity>
	);
}
