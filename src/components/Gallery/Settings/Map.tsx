import {MouseEvent, useRef, useState} from "react";
import {IoMan} from "react-icons/io5";

import type {PlanimetryBlock} from "@app/types";
import {PlanimetryBlockType} from "@app/types/enums";
import useContainerDimensions from "@hooks/useDimensions";
import {isBlockInsideWalls} from "@utils/planimetry";

export default function GalleryMap({
	planimetry,
	size,
	mode,
	onSelect,
	onSpawnSelected,
	onChangeBlockType,
}): JSX.Element {
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
				map[x][y] = blocks[x * size + y] || ({} as PlanimetryBlock);
			}
		}
	}

	const getBlockColor = (block: PlanimetryBlock) => {
		return block.type === PlanimetryBlockType.Wall ? block.color : "";
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
					<tr key={rowIndex}>
						{row.map((cell, cellIndex) => (
							<td
								key={cellIndex}
								style={{
									backgroundColor: getBlockColor(cell),
									border: "1px dashed #ccc",
									userSelect: "none",
									width: size / 100 + "%",
									paddingBottom: size / 100 + "%",
									height: 0,
									textAlign: "center",
									verticalAlign: "middle",
									lineHeight: "100%",
									fontSize: "100%",
								}}
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
											onSpawnSelected(cell.id);
										}
									} else if (mode === "erase" || e.button === 2) {
										onChangeBlockType(cell.id, PlanimetryBlockType.Floor);
										setMouseRightDown(true);
									} else if (mode === "planimetry") {
										onChangeBlockType(cell.id, PlanimetryBlockType.Wall);
									}
								}}
								onMouseEnter={(e: MouseEvent) => {
									if (mouseDown) {
										if (mode === "erase" || mouseRightDown) {
											onChangeBlockType(cell.id, PlanimetryBlockType.Floor);
										} else if (mode === "planimetry") {
											onChangeBlockType(cell.id, PlanimetryBlockType.Wall);
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
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
