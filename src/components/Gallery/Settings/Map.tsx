import {MouseEvent, useRef, useState} from "react";
import {IoMan} from "react-icons/io5";
import {Td, Tr} from "@chakra-ui/react";

import type {PlanimetryBlock} from "@app/types";
import {PlanimetryBlockType} from "@app/types/enums";
import useGalleryPlanimetry from "@contexts/GalleryPlanimetry";
import useContainerDimensions from "@hooks/useDimensions";
import {getNeighborsWithDetails, isBlockInsideWalls} from "@utils/planimetry";

export default function GalleryMap(): JSX.Element {
	const {planimetry, size, mode, onSelect, onChangeSpawn, onChangeBlock, color, texture} =
		useGalleryPlanimetry();

	const [mouseDown, setMouseDown] = useState(false);
	const [mouseRightDown, setMouseRightDown] = useState(false);
	const mapRef = useRef();
	const {width: mapWidth} = useContainerDimensions(mapRef);
	const defaultWallColor = "#cbd5e0";

	const map: PlanimetryBlock[][] = [];
	const blocks: PlanimetryBlock[] = Array.from(planimetry?.blocks || []);
	if (planimetry) {
		for (var x = 0; x < size; x++) {
			map[x] = [];
			for (var y = 0; y < size; y++) {
				map[x][y] = blocks[x * size + y] || ({} as PlanimetryBlock);
			}
		}
	}

	const getBlockStyle = (block: PlanimetryBlock) => {
		const styles = {
			borderTop: "1px dashed #ccc",
			borderBottom: "1px dashed #ccc",
			borderLeft: "1px dashed #ccc",
			borderRight: "1px dashed #ccc",
			backgroundColor: block.color,
			backgroundImage: block.texture?.image,
			backgroundSize: "cover",
		};
		if (block.type === PlanimetryBlockType.Wall) {
			const neightbours = getNeighborsWithDetails(block.id, planimetry);
			neightbours.forEach((neightbour) => {
				if (neightbour.type !== PlanimetryBlockType.Wall) {
					styles[
						"border" +
							neightbour.direction.charAt(0).toUpperCase() +
							neightbour.direction.slice(1)
					] = "5px solid black";
				} else {
					styles[
						"border" +
							neightbour.direction.charAt(0).toUpperCase() +
							neightbour.direction.slice(1)
					] = "none";
				}
			});
		}
		return styles;
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
								textAlign="center"
								verticalAlign="middle"
								lineHeight="100%"
								fontSize="100%"
								{...getBlockStyle(cell)}
								onContextMenu={(e) => e.preventDefault()}
								onMouseDown={(e: MouseEvent) => {
									setMouseDown(true);
									if (mode === "select") {
										onSelect(cell);
									} else if (mode === "spawn") {
										if (
											isBlockInsideWalls(cell.id, planimetry) &&
											cell.type !== PlanimetryBlockType.Wall
										) {
											onChangeSpawn(cell.id);
										}
									} else if (mode === "erase" || e.button === 2) {
										onChangeBlock(cell.id, {
											id: cell.id,
											type: PlanimetryBlockType.Floor,
										});
										setMouseRightDown(true);
									} else if (mode === "planimetry") {
										cell.type = PlanimetryBlockType.Wall;
										cell.color = color || defaultWallColor;
										cell.texture = texture;
										onChangeBlock(cell.id, cell);
									}
								}}
								onMouseEnter={(e: MouseEvent) => {
									if (mouseDown) {
										if (mode === "erase" || mouseRightDown) {
											onChangeBlock(cell.id, {
												id: cell.id,
												type: PlanimetryBlockType.Floor,
											});
										} else if (mode === "planimetry") {
											cell.type = PlanimetryBlockType.Wall;
											cell.color = color || defaultWallColor;
											cell.texture = texture;
											onChangeBlock(cell.id, cell);
										}
									}
								}}
								onMouseUp={(e: MouseEvent) => {
									setMouseDown(false);
									setMouseRightDown(false);
								}}>
								<IoMan
									style={{
										display: "inline",
										visibility:
											cell.id === planimetry.spawn ? "visible" : "hidden",
									}}
								/>
							</Td>
						))}
					</Tr>
				))}
			</tbody>
		</table>
	);
}
