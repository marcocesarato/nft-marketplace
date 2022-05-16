import {MouseEvent, useEffect, useRef, useState} from "react";
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	HStack,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	VStack,
} from "@chakra-ui/react";
import {Select} from "chakra-react-select";

import type {PlanimetryBlock, PlanimetryMap} from "@app/types";
import {PlanimetryBlockType} from "@app/types/enums";
import useContainerDimensions from "@hooks/useDimensions";
import {getInsideWallFloor, isBlockInsideWalls} from "@utils/planimetry";

const blockTypesOptions = [
	{value: PlanimetryBlockType.Wall.toString(), label: "Wall"},
	{value: PlanimetryBlockType.Floor.toString(), label: "Floor"},
	{value: PlanimetryBlockType.Door.toString(), label: "Ceiling"},
];

export default function GallerySettings(): JSX.Element {
	const [mode, setMode] = useState("planimetry");
	const [selected, setSelected] = useState<PlanimetryBlock | null>(null);
	const [mouseDown, setMouseDown] = useState(false);
	const [mouseRightDown, setMouseRightDown] = useState(false);
	const [planimetry, setPlanimetry] = useState<PlanimetryMap>();
	const [spawnPosition, setSpawnPosition] = useState(-1);
	const [mapSize, setMapSize] = useState(20);
	const mapRef = useRef();
	const {width: mapWidth} = useContainerDimensions(mapRef);

	const map: PlanimetryBlock[][] = [];

	const blocks = Array.from(planimetry?.blocks || []);
	if (planimetry) {
		for (var x = 0; x < mapSize; x++) {
			map[x] = [];
			for (var y = 0; y < mapSize; y++) {
				map[x][y] = blocks[x * mapSize + y] || ({} as PlanimetryBlock);
			}
		}
	}

	const getBlockColor = (block: PlanimetryBlock) => {
		if (block.id === spawnPosition) return "blue";
		return block.type === PlanimetryBlockType.Wall ? block.color : "";
	};

	const changePlanimetryBlockType = (id: number, value?: PlanimetryBlockType) => {
		const map = {...planimetry};
		const blocks = Array.from(planimetry.blocks);
		blocks[id].type = value;
		map.blocks = new Set(blocks);
		setPlanimetry(map);
	};

	// On mount create a map of the gallery with all planes
	useEffect(() => {
		const map: PlanimetryMap = {
			height: mapSize,
			width: mapSize,
			blocks: new Set(),
		};
		for (let i = 0; i < mapSize * mapSize; i++) {
			map.blocks.add({
				id: i,
				material: "",
				color: "#AAA",
				type: PlanimetryBlockType.Floor,
			});
		}
		setPlanimetry(map);
	}, [mapSize]);

	useEffect(() => {
		if (planimetry && planimetry.blocks.size > 0) {
			let position = spawnPosition;
			if (planimetry && spawnPosition !== -1) {
				if (!isBlockInsideWalls(position, planimetry)) {
					position = -1;
					setSpawnPosition(-1);
				}
			}
			const insideFloor = getInsideWallFloor(planimetry);
			const arrayFloor = Array.from(insideFloor);
			if (arrayFloor.length > 0 && position === -1) {
				setSpawnPosition(arrayFloor[0]);
			}
		}
	}, [planimetry, spawnPosition]);

	return (
		<Box>
			<HStack isInline alignItems={"flex-start"}>
				<Box flex={1} maxWidth={300}>
					<Accordion defaultIndex={[0, 1]} allowMultiple>
						<AccordionItem>
							<h2>
								<AccordionButton>
									<Box flex="1" textAlign="left">
										Map size
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								<NumberInput
									value={mapSize}
									onChange={(_, value) => setMapSize(value)}
									size="sm"
									min={10}
									max={50}
									step={1}>
									<NumberInputField />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							</AccordionPanel>
						</AccordionItem>
						<AccordionItem>
							<h2>
								<AccordionButton>
									<Box flex="1" textAlign="left">
										Planimetry
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								<VStack spacing={4}>
									<Button
										size="sm"
										w={"full"}
										onClick={() => setMode("planimetry")}
										isActive={mode === "planimetry"}>
										Build walls
									</Button>
									<Button
										size="sm"
										w={"full"}
										onClick={() => setMode("erase")}
										isActive={mode === "erase"}>
										Destroy walls
									</Button>
									<Button
										size="sm"
										w={"full"}
										onClick={() => setMode("spawn")}
										isActive={mode === "spawn"}>
										Set spawn position
									</Button>
									<Button
										size="sm"
										w={"full"}
										onClick={() => setMode("select")}
										isActive={mode === "select"}>
										Select block
									</Button>
								</VStack>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
					<Button
						size="lg"
						mt={4}
						w={"full"}
						onClick={() => setMode("save")}
						isActive={mode === "save"}>
						Save
					</Button>
				</Box>
				<table
					ref={mapRef}
					style={{
						flex: 2,
						width: "100%",
						height: mapWidth,
						maxWidth: window.innerHeight - 250,
					}}>
					<tbody>
						{map.map((row, rowIndex) => (
							<tr key={rowIndex}>
								{row.map((cell, cellIndex) => (
									<td
										key={cellIndex}
										style={{
											backgroundColor: getBlockColor(cell),
											border: "1px dashed #ccc",
											userSelect: "none",
											width: mapSize / 100 + "%",
											paddingBottom: mapSize / 100 + "%",
											height: 0,
											textAlign: "center",
										}}
										onContextMenu={(e) => e.preventDefault()}
										onMouseDown={(e: MouseEvent) => {
											setMouseDown(true);
											if (mode === "select") {
												setSelected(cell);
											} else if (mode === "spawn") {
												if (
													isBlockInsideWalls(cell.id, planimetry) &&
													cell.type !== PlanimetryBlockType.Wall
												) {
													setSpawnPosition(cell.id);
												}
											} else if (mode === "erase" || e.button === 2) {
												changePlanimetryBlockType(
													cell.id,
													PlanimetryBlockType.Floor,
												);
												setMouseRightDown(true);
											} else if (mode === "planimetry") {
												changePlanimetryBlockType(
													cell.id,
													PlanimetryBlockType.Wall,
												);
											}
										}}
										onMouseEnter={(e: MouseEvent) => {
											if (mouseDown) {
												if (mode === "erase" || mouseRightDown) {
													changePlanimetryBlockType(
														cell.id,
														PlanimetryBlockType.Floor,
													);
												} else if (mode === "planimetry") {
													changePlanimetryBlockType(
														cell.id,
														PlanimetryBlockType.Wall,
													);
												}
											}
										}}
										onMouseUp={(e: MouseEvent) => {
											setMouseDown(false);
											setMouseRightDown(false);
										}}>
										<small>{cell.id}</small>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				{selected && (
					<VStack spacing={4} flex={1} maxWidth={300}>
						<Accordion defaultIndex={[0]} allowMultiple>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left">
											Block type
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									<VStack spacing={4}>
										<Box>
											<Select
												placeholder="Block type"
												value={selected.type.toString()}
												options={blockTypesOptions}
												onChange={(option) => {
													changePlanimetryBlockType(
														selected.id,
														option.value as PlanimetryBlockType,
													);
												}}
											/>
										</Box>
									</VStack>
								</AccordionPanel>
							</AccordionItem>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left">
											Floor
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>Lorem ipsum dolor sit amet</AccordionPanel>
							</AccordionItem>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left">
											Wall Top
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>Lorem ipsum dolor sit amet</AccordionPanel>
							</AccordionItem>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box flex="1" textAlign="left">
											Wall Bottom
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>Lorem ipsum dolor sit amet</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</VStack>
				)}
			</HStack>
		</Box>
	);
}
