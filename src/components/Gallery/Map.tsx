import {useEffect} from "react";

import {PlanimetryBlockTypeEnum} from "@app/enums";
import {MainCamera} from "@components/AFrame";
import {CameraHeight, WallHeight, WallSize} from "@configs/gallery";
import useGallery from "@contexts/Gallery";

import Ceiling from "./Ceiling";
import Floor from "./Floor";
import Wall from "./Wall";

export default function Map({planimetry}): JSX.Element {
	const {schema, setPlanimetry} = useGallery();
	const map = schema.getMap();

	const spawn = schema.getSpawn();
	const spawnX = spawn % map.width;
	const spawnY = Math.floor(spawn / map.width);
	const cameraPosition = {
		x: (spawnX - map.width / 2) * WallSize,
		y: CameraHeight,
		z: (spawnY - map.height / 2) * WallSize,
	};

	useEffect(() => {
		if (planimetry) setPlanimetry(planimetry);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [planimetry]);

	const BlocksRender = [];
	map.blocks.forEach((block) => {
		const x = block.id % map.width;
		const y = Math.floor(block.id / map.width);
		let position;
		let navmesh = true;
		switch (block.type) {
			case PlanimetryBlockTypeEnum.Wall:
				navmesh = false;
				position = {
					x: (x - map.width / 2) * WallSize,
					y: WallHeight / 2,
					z: (y - map.height / 2) * WallSize,
				};
				BlocksRender.push(<Wall position={position} />);
			// eslint-disable-next-line no-fallthrough
			case PlanimetryBlockTypeEnum.Floor:
				position = {
					x: (x - map.width / 2) * WallSize,
					y: 0,
					z: (y - map.height / 2) * WallSize,
				};
				BlocksRender.push(<Floor position={position} navmesh={navmesh} />);
				position = {
					x: (x - map.width / 2) * WallSize,
					y: WallHeight,
					z: (y - map.height / 2) * WallSize,
				};
				BlocksRender.push(<Ceiling position={position} />);
				break;
		}
	});

	return (
		<>
			{/* Blocks */}
			{BlocksRender}
			{/* Camera */}
			<MainCamera userHeight={CameraHeight} position={cameraPosition} />
		</>
	);
}
