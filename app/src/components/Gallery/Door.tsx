import {PlanimetryBlock} from "@app/types";
import {WallHeight} from "@configs/gallery";

import Wall from "./Wall";

type DoorProps = {
	position?: {x: number; y: number; z: number};
	neighbors: PlanimetryBlock[];
	[key: string]: any;
};

export default function Door({position, neighbors, ...props}: DoorProps): JSX.Element {
	const height = WallHeight / 5;
	const positionTop = {x: position.x, y: WallHeight - height / 2, z: position.z};
	return (
		<Wall
			position={positionTop}
			height={height}
			neighbors={neighbors}
			navmesh={true}
			{...props}
		/>
	);
}
