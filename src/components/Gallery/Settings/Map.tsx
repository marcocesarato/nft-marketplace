import {MouseEvent, useRef, useState} from "react";
import {IoAccessibilitySharp} from "react-icons/io5";
import {Td, Tr} from "@chakra-ui/react";

import type {PlanimetryBlock} from "@app/types";
import {PlanimetryBlockType} from "@app/types/enums";
import useGalleryPlanimetry from "@contexts/GalleryPlanimetry";
import useContainerDimensions from "@hooks/useDimensions";
import {clone} from "@utils/converters";
import {getNeighborsDetails, isBlockInsideWalls} from "@utils/planimetry";

export default function GalleryMap(): JSX.Element {
	const {
		planimetry,
		size,
		mode,
		selected,
		onSelect,
		onChangeSpawn,
		onChangeBlock,
		color,
		texture,
	} = useGalleryPlanimetry();

	const [mouseDown, setMouseDown] = useState(false);
	const [mouseRightDown, setMouseRightDown] = useState(false);
	const mapRef = useRef();
	const {width: mapWidth} = useContainerDimensions(mapRef);

	const map: PlanimetryBlock[][] = [];
	const blocks: PlanimetryBlock[] = Array.from(planimetry?.blocks || []);
	if (planimetry) {
		for (var x = 0; x < size; x++) {
			map[x] = [];
			for (var y = 0; y < size; y++) {
				map[x][y] = clone(blocks[x * size + y]) || ({} as PlanimetryBlock);
			}
		}
	}

	const getBlockStyle = (block: PlanimetryBlock) => {
		const defaultWallColor = "#cbd5e0";
		const selectedBorder = "3px dashed #00bfff";
		const defaultBorder = "1px dashed #cbd5e0";
		const wallBorder = "3px solid black";
		const styles = {
			borderTop: defaultBorder,
			borderBottom: defaultBorder,
			borderLeft: defaultBorder,
			borderRight: defaultBorder,
			backgroundColor: block.color,
			backgroundImage: block.texture?.image,
			backgroundSize: "cover",
		};
		if (block.type === PlanimetryBlockType.Wall) {
			styles.backgroundColor ||= defaultWallColor;
			const neightbours = getNeighborsDetails(block.id, planimetry);
			neightbours.forEach((neightbour) => {
				if (neightbour.type !== PlanimetryBlockType.Wall) {
					styles[
						"border" +
							neightbour.direction.charAt(0).toUpperCase() +
							neightbour.direction.slice(1)
					] = wallBorder;
				} else {
					styles[
						"border" +
							neightbour.direction.charAt(0).toUpperCase() +
							neightbour.direction.slice(1)
					] = "none";
				}
			});
			// If a side is a map margin add the border
			if (block.id % size === 0) {
				styles.borderLeft = wallBorder;
			}
			if (block.id % size === size - 1) {
				styles.borderRight = wallBorder;
			}
			if (block.id < size) {
				styles.borderTop = wallBorder;
			}
			if (block.id >= size * (size - 1)) {
				styles.borderBottom = wallBorder;
			}
		}
		if (selected?.id === block.id) {
			styles.borderBottom = selectedBorder;
			styles.borderTop = selectedBorder;
			styles.borderLeft = selectedBorder;
			styles.borderRight = selectedBorder;
		}
		return styles;
	};

	const getCursor = () => {
		if (mode === "planimetry" || mode === "erase") {
			return "crosshair";
		}
		if (mode === "color") {
			return "crosshair";
		}
		if (mode === "select" || mode === "spawn") {
			return "pointer";
		}
		return "default";
	};

	return (
		<table
			ref={mapRef}
			style={{
				flex: 2,
				width: "100%",
				height: mapWidth,
				maxWidth: window.innerHeight - 200,
			}}>
			<tbody>
				{map.map((row, rowIndex) => (
					<Tr key={rowIndex}>
						{row.map((cell, cellIndex) => (
							<Td
								key={cellIndex}
								userSelect="none"
								width={mapWidth / size}
								height={mapWidth / size}
								cursor={getCursor()}
								{...getBlockStyle(cell)}
								onContextMenu={(e) => e.preventDefault()}
								onMouseDown={(e: MouseEvent) => {
									setMouseDown(true);
									let eventMode = mode;
									if (e.button === 2) {
										eventMode = "erase";
									}
									switch (eventMode) {
										case "planimetry":
											cell.type = PlanimetryBlockType.Wall;
											onChangeBlock(cell.id, cell);
											break;
										case "erase":
											onChangeBlock(cell.id, {
												id: cell.id,
												type: PlanimetryBlockType.Floor,
											});
											setMouseRightDown(true);
											break;
										case "select":
											if (cell.id !== planimetry.spawn) {
												onSelect(cell);
											}
											break;
										case "spawn":
											if (
												isBlockInsideWalls(cell.id, planimetry) &&
												cell.type !== PlanimetryBlockType.Wall
											) {
												onChangeSpawn(cell.id);
											}
											break;
										case "color":
											cell.color = color;
											cell.texture = texture;
											onChangeBlock(cell.id, cell);
											break;
									}
								}}
								onMouseEnter={() => {
									if (mouseDown) {
										if (mode === "erase" || mouseRightDown) {
											onChangeBlock(cell.id, {
												id: cell.id,
												type: PlanimetryBlockType.Floor,
											});
										} else if (mode === "planimetry") {
											cell.type = PlanimetryBlockType.Wall;
											onChangeBlock(cell.id, cell);
										} else if (mode === "color") {
											cell.color = color;
											cell.texture = texture;
											onChangeBlock(cell.id, cell);
										}
									}
								}}
								onMouseUp={(e: MouseEvent) => {
									setMouseDown(false);
									setMouseRightDown(false);
								}}>
								<span
									style={{
										backgroundColor: "#FFF",
										color: "#000",
										borderRadius: "50%",
										height: "100%",
										width: "100%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										visibility:
											cell.id === planimetry.spawn ? "visible" : "hidden",
									}}>
									<IoAccessibilitySharp
										style={{
											display: "inline-block",
										}}
									/>
								</span>
							</Td>
						))}
					</Tr>
				))}
			</tbody>
		</table>
	);
}
