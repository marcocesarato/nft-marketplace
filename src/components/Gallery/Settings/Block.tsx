import {memo, MouseEvent, useCallback, useMemo} from "react";
import {IoAccessibilitySharp} from "react-icons/io5";
import {Td} from "@chakra-ui/react";

import type {PlanimetryBlock} from "@app/types";
import {PlanimetryBlockType} from "@app/types/enums";
import useGallery from "@contexts/Gallery";
import {clone} from "@utils/converters";

function Block({
	data,
	size,
	mouseDown,
	setMouseDown,
	mouseRightDown,
	setMouseRightDown,
}): JSX.Element {
	const {schema, mode, selected, onSelect, onChangeSpawn, onChangeBlock, color, texture} =
		useGallery();
	const blockData = useMemo(() => clone(data), [data]);
	const getBlockStyle = useCallback(
		(block: PlanimetryBlock) => {
			const defaultWallColor = "#cbd5e0";
			const selectedBorder = "3px dashed #00bfff";
			const defaultBorder = "1px dashed #cbd5e0";
			const defaultMarginBorder = "3px solid #cbd5e0";
			const wallBorder = "3px solid black";
			const styles = {
				width: size,
				height: size,
				borderTop: defaultBorder,
				borderBottom: defaultBorder,
				borderLeft: defaultBorder,
				borderRight: defaultBorder,
				backgroundColor: block.color,
				backgroundImage: block.texture?.image,
				backgroundSize: "cover",
				cursor: "pointer",
			};
			const isWall = block.type === PlanimetryBlockType.Wall;
			if (isWall) {
				styles.backgroundColor ||= defaultWallColor;
				const neightbours = schema.getNeighborsDetails(block.id);
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
			}
			const marginBorder = isWall ? wallBorder : defaultMarginBorder;
			if (schema.isMapBorderTop(block.id)) {
				styles.borderTop = marginBorder;
			}
			if (schema.isMapBorderBottom(block.id)) {
				styles.borderBottom = marginBorder;
			}
			if (schema.isMapBorderLeft(block.id)) {
				styles.borderLeft = marginBorder;
			}
			if (schema.isMapBorderRight(block.id)) {
				styles.borderRight = marginBorder;
			}
			if (selected?.id === block.id) {
				styles.borderBottom = selectedBorder;
				styles.borderTop = selectedBorder;
				styles.borderLeft = selectedBorder;
				styles.borderRight = selectedBorder;
			}
			if (mode === "planimetry" || mode === "erase" || mode === "color") {
				styles.cursor = "crosshair";
			}
			return styles;
		},
		[mode, schema, size, selected],
	);

	return (
		<Td
			userSelect="none"
			onContextMenu={(e) => e.preventDefault()}
			onMouseDown={(e: MouseEvent) => {
				setMouseDown(true);
				let eventMode = mode;
				if (e.button === 2) {
					eventMode = "erase";
				}
				switch (eventMode) {
					case "planimetry":
						blockData.type = PlanimetryBlockType.Wall;
						onChangeBlock(data.id, blockData);
						break;
					case "erase":
						onChangeBlock(data.id, {
							id: data.id,
							type: PlanimetryBlockType.Floor,
						});
						setMouseRightDown(true);
						break;
					case "select":
						if (data.id !== schema.getSpawn()) {
							onSelect(data);
						}
						break;
					case "spawn":
						onChangeSpawn(data.id);
						break;
					case "color":
						blockData.color = color;
						blockData.texture = texture;
						onChangeBlock(data.id, blockData);
						break;
				}
			}}
			onMouseEnter={() => {
				if (mouseDown) {
					if (mode === "erase" || mouseRightDown) {
						onChangeBlock(data.id, {
							id: data.id,
							type: PlanimetryBlockType.Floor,
						});
					} else if (mode === "planimetry") {
						blockData.type = PlanimetryBlockType.Wall;
						onChangeBlock(data.id, blockData);
					} else if (mode === "color") {
						blockData.color = color;
						blockData.texture = texture;
						onChangeBlock(data.id, blockData);
					}
				}
			}}
			onMouseUp={(e: MouseEvent) => {
				setMouseDown(false);
				setMouseRightDown(false);
			}}
			{...getBlockStyle(data)}>
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
					visibility: data.id === schema.getSpawn() ? "visible" : "hidden",
				}}>
				<IoAccessibilitySharp
					style={{
						display: "inline-block",
					}}
				/>
			</span>
		</Td>
	);
}

export default memo(Block);
