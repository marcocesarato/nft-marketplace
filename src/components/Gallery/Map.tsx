import {useEffect} from "react";

import {PlanimetryBlockTypeEnum} from "@app/enums";
import {MainCamera} from "@components/AFrame";
import {CameraHeight, WallHeight, WallSize} from "@configs/gallery";
import useGallery from "@contexts/Gallery";

import Floor from "./Floor";
import Wall from "./Wall";

export default function Map({planimetry}): JSX.Element {
	const {schema, setPlanimetry} = useGallery();
	const map = schema.getMap();

	const spawn = schema.getSpawn();
	const spawnX = spawn % map.width;
	const spawnY = Math.floor(spawn / map.width);
	const cameraPosition = `${(spawnX - map.width / 2) * WallSize} ${CameraHeight} ${
		(spawnY - map.height / 2) * WallSize
	}`;

	console.log(cameraPosition);

	useEffect(() => {
		if (planimetry) setPlanimetry(planimetry);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [planimetry]);
	return (
		<>
			{/* Blocks */}
			{map.blocks.map((block) => {
				const x = block.id % map.width;
				const y = Math.floor(block.id / map.width);

				const position = `${(x - map.width / 2) * WallSize} ${WallHeight / 2} ${
					(y - map.height / 2) * WallSize
				}`;
				switch (block.type) {
					case PlanimetryBlockTypeEnum.Wall:
						return <Wall key={block.id} position={position} />;
					case PlanimetryBlockTypeEnum.Floor:
						return <Floor key={block.id} position={position} />;
					default:
						return <></>;
				}
			})}
			{/* Camera */}
			<MainCamera userHeight={CameraHeight} position={cameraPosition} />
		</>
	);
}
