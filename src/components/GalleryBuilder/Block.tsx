import {memo, MouseEvent, useCallback, useMemo} from "react";
import {IoAccessibilitySharp} from "react-icons/io5";
import {Box} from "@chakra-ui/react";

import {PlanimetryBlockTypeEnum} from "@app/enums";
import type {PlanimetryBlock} from "@app/types";
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
			const isWall = block.type === PlanimetryBlockTypeEnum.Wall;
			if (isWall) {
				styles.backgroundColor ||= defaultWallColor;
				const neightbours = schema.getNeighborsDetails(block.id);
				neightbours.forEach((neightbour) => {
					if (neightbour.type !== PlanimetryBlockTypeEnum.Wall) {
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
		<Box
			as={"td"}
			userSelect="none"
			onContextMenu={(e) => e.preventDefault()}
			onMouseDown={(e: MouseEvent) => {
				let isRightMouse = false;
				setMouseDown(true);
				if (e.button === 2) {
					isRightMouse = true;
					setMouseRightDown(true);
				}
				switch (mode) {
					case "planimetry":
						if (!isRightMouse) {
							blockData.type = PlanimetryBlockTypeEnum.Wall;
							onChangeBlock(data.id, blockData);
							break;
						}
					// eslint-disable-next-line no-fallthrough
					case "erase":
						onChangeBlock(data.id, {
							id: data.id,
							type: PlanimetryBlockTypeEnum.Floor,
						});
						break;
					case "select":
						onSelect(data);
						break;
					case "spawn":
						onChangeSpawn(data.id);
						break;
					case "color":
						blockData.color = isRightMouse ? null : color;
						blockData.texture = isRightMouse ? null : texture;
						onChangeBlock(data.id, blockData);
						break;
				}
			}}
			onMouseEnter={() => {
				if (mouseDown) {
					switch (mode) {
						case "planimetry":
							if (!mouseRightDown) {
								blockData.type = PlanimetryBlockTypeEnum.Wall;
								onChangeBlock(data.id, blockData);
								break;
							}
						// eslint-disable-next-line no-fallthrough
						case "erase":
							onChangeBlock(data.id, {
								id: data.id,
								type: PlanimetryBlockTypeEnum.Floor,
							});
							break;
						case "color":
							blockData.color = mouseRightDown ? null : color;
							blockData.texture = mouseRightDown ? null : texture;
							onChangeBlock(data.id, blockData);
							break;
					}
				}
			}}
			onMouseUp={(e: MouseEvent) => {
				setMouseDown(false);
				setMouseRightDown(false);
			}}
			{...getBlockStyle(data)}>
			<Box
				as="span"
				backgroundColor="#FFF"
				color="#000"
				borderRadius="50%"
				height="100%"
				width="100%"
				display="flex"
				justifyContent="center"
				alignItems="center"
				visibility={data.id === schema.getSpawn() ? "visible" : "hidden"}>
				<IoAccessibilitySharp
					style={{
						display: "inline-block",
					}}
				/>
			</Box>
		</Box>
	);
}

export default memo(Block);
