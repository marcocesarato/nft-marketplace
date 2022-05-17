import {useEffect} from "react";
import {Box, HStack} from "@chakra-ui/react";

import type {PlanimetryBlock, PlanimetryMap} from "@app/types";
import {PlanimetryBlockType} from "@app/types/enums";
import useGalleryPlanimetry from "@contexts/GalleryPlanimetry";
import {getInsideWallFloor, isBlockInsideWalls} from "@utils/planimetry";

import Details from "./Details";
import Map from "./Map";
import Toolbar from "./Toolbar";

export default function GallerySettings(): JSX.Element {
	const {planimetry, selected, size, clearMap, setPlanimetry, onChangeSpawn} =
		useGalleryPlanimetry();

	useEffect(() => {
		let blocks: PlanimetryBlock[] = [];
		if (planimetry) {
			blocks = Array.from(planimetry.blocks);
		}
		const map: PlanimetryMap = {
			height: size,
			width: size,
			blocks: new Set(),
		};
		for (let i = 0; i < size * size; i++) {
			map.blocks.add(
				blocks[i] || {
					id: i,
					type: PlanimetryBlockType.Floor,
				},
			);
		}
		setPlanimetry(map);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [size]);

	// TODO: REMOVE THIS, JUST FOR TESTING
	useEffect(() => {
		clearMap();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (planimetry && planimetry.blocks.size > 0) {
			let position = planimetry.spawn;
			if (planimetry && planimetry.spawn !== -1) {
				if (!isBlockInsideWalls(position, planimetry)) {
					position = -1;
					onChangeSpawn(-1);
				}
			}
			const insideFloor = getInsideWallFloor(planimetry);
			const arrayFloor: number[] = Array.from(insideFloor);
			if (arrayFloor.length > 0 && position === -1) {
				onChangeSpawn(arrayFloor[0]);
			}
		}
	}, [planimetry, onChangeSpawn]);

	return (
		<Box>
			<HStack isInline alignItems={"flex-start"}>
				<Toolbar onSave={() => {}} />
				<Map />
				{selected && <Details />}
			</HStack>
		</Box>
	);
}
