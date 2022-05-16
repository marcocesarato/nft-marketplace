import {useCallback, useEffect, useState} from "react";
import {Box, HStack} from "@chakra-ui/react";

import type {PlanimetryBlock, PlanimetryMap} from "@app/types";
import {PlanimetryBlockType} from "@app/types/enums";
import {getInsideWallFloor, isBlockInsideWalls} from "@utils/planimetry";

import Details from "./Details";
import Map from "./Map";
import Toolbar from "./Toolbar";

export default function GallerySettings(): JSX.Element {
	const [mode, setMode] = useState("planimetry");
	const [selected, setSelected] = useState<PlanimetryBlock | null>(null);
	const [planimetry, setPlanimetry] = useState<PlanimetryMap>(); // TODO: get from user data
	const [mapSize, setMapSize] = useState(20);

	const onChangeBlockType = (id: number, value?: PlanimetryBlockType) => {
		const map = {...planimetry};
		const blocks: PlanimetryBlock[] = Array.from(planimetry.blocks);
		blocks[id].type = value || PlanimetryBlockType.Floor;
		map.blocks = new Set(blocks);
		setPlanimetry(map);
	};

	const onChangeBlock = (id: number, value: PlanimetryBlock) => {
		const map = {...planimetry};
		const blocks: PlanimetryBlock[] = Array.from(planimetry.blocks);
		blocks[id] = value;
		map.blocks = new Set(blocks);
		setPlanimetry(map);
	};

	const setSpawn = useCallback(
		(id: number) => {
			const map = {...planimetry};
			map.spawn = id;
			setPlanimetry(map);
		},
		[planimetry],
	);

	useEffect(() => {
		let blocks: PlanimetryBlock[] = [];
		if (planimetry) {
			blocks = Array.from(planimetry.blocks);
		}
		const map: PlanimetryMap = {
			height: mapSize,
			width: mapSize,
			blocks: new Set(),
		};
		for (let i = 0; i < mapSize * mapSize; i++) {
			map.blocks.add(
				blocks[i] || {
					id: i,
					type: PlanimetryBlockType.Floor,
				},
			);
		}
		setPlanimetry(map);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mapSize]);

	// TODO: REMOVE THIS, JUST FOR TESTING
	useEffect(() => {
		const map: PlanimetryMap = {
			height: 20,
			width: 20,
			blocks: new Set(),
		};
		for (let i = 0; i < 20 * mapSize; i++) {
			map.blocks.add({
				id: i,
				material: "",
				color: "#cbd5e0",
				type: PlanimetryBlockType.Floor,
			});
		}
		setPlanimetry(map);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (planimetry && planimetry.blocks.size > 0) {
			let position = planimetry.spawn;
			if (planimetry && planimetry.spawn !== -1) {
				if (!isBlockInsideWalls(position, planimetry)) {
					position = -1;
					setSpawn(-1);
				}
			}
			const insideFloor = getInsideWallFloor(planimetry);
			const arrayFloor: number[] = Array.from(insideFloor);
			if (arrayFloor.length > 0 && position === -1) {
				setSpawn(arrayFloor[0]);
			}
		}
	}, [planimetry, setSpawn]);

	return (
		<Box>
			<HStack isInline alignItems={"flex-start"}>
				<Toolbar
					mode={mode}
					mapSize={mapSize}
					onChangeMode={setMode}
					onChangeMapSize={setMapSize}
					onSave={() => {}}
				/>
				<Map
					planimetry={planimetry}
					size={mapSize}
					mode={mode}
					onChangeBlockType={onChangeBlockType}
					onSelect={setSelected}
					onSpawnSelected={setSpawn}
				/>
				{selected && (
					<Details
						selected={selected}
						onChangeBlock={onChangeBlock}
						onChangeBlockType={onChangeBlockType}
					/>
				)}
			</HStack>
		</Box>
	);
}
