import {memo, MouseEvent, useCallback, useMemo} from "react";
import {IoAccessibilitySharp} from "react-icons/io5";
import {TbDoor, TbWindow} from "react-icons/tb";
import {Box} from "@chakra-ui/react";

import {GalleryBuilderModeEnum, MapDirectionEnum, PlanimetryBlockTypeEnum} from "@app/enums";
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
	const isSpawn = data?.id === schema.getSpawn();
	const isDoor = data?.type === PlanimetryBlockTypeEnum.Door;
	const isWindow = data?.type === PlanimetryBlockTypeEnum.Window;
	const isWall = data?.type === PlanimetryBlockTypeEnum.Wall;
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
				padding: 2,
				borderTop: defaultBorder,
				borderBottom: defaultBorder,
				borderLeft: defaultBorder,
				borderRight: defaultBorder,
				backgroundColor: block.color,
				backgroundImage: block.texture?.image,
				backgroundSize: "cover",
				cursor: "pointer",
			};
			if (isWall || isDoor || isWindow) {
				styles.backgroundColor ||= defaultWallColor;
				const neightbours = schema.getNeighborsDetails(block.id);
				neightbours.forEach((neightbour) => {
					if (
						neightbour.type !== PlanimetryBlockTypeEnum.Wall &&
						neightbour.type !== PlanimetryBlockTypeEnum.Door &&
						neightbour.type !== PlanimetryBlockTypeEnum.Window
					) {
						switch (neightbour.direction) {
							case MapDirectionEnum.North:
								styles.borderTop = wallBorder;
								break;
							case MapDirectionEnum.South:
								styles.borderBottom = wallBorder;
								break;
							case MapDirectionEnum.East:
								styles.borderRight = wallBorder;
								break;
							case MapDirectionEnum.West:
								styles.borderLeft = wallBorder;
								break;
						}
					} else {
						switch (neightbour.direction) {
							case MapDirectionEnum.North:
								styles.borderTop = "none";
								break;
							case MapDirectionEnum.South:
								styles.borderBottom = "none";
								break;
							case MapDirectionEnum.East:
								styles.borderRight = "none";
								break;
							case MapDirectionEnum.West:
								styles.borderLeft = "none";
								break;
						}
					}
				});
			}
			const marginBorder = isWall || isDoor || isWindow ? wallBorder : defaultMarginBorder;
			if (schema.isMapBorderNorth(block.id)) {
				styles.borderTop = marginBorder;
			}
			if (schema.isMapBorderSouth(block.id)) {
				styles.borderBottom = marginBorder;
			}
			if (schema.isMapBorderWest(block.id)) {
				styles.borderLeft = marginBorder;
			}
			if (schema.isMapBorderEast(block.id)) {
				styles.borderRight = marginBorder;
			}
			if (selected?.id === block.id) {
				styles.borderBottom = selectedBorder;
				styles.borderTop = selectedBorder;
				styles.borderLeft = selectedBorder;
				styles.borderRight = selectedBorder;
			}
			if (
				mode === GalleryBuilderModeEnum.Planimetry ||
				mode === GalleryBuilderModeEnum.Erase ||
				mode === GalleryBuilderModeEnum.Color
			) {
				styles.cursor = "crosshair";
			}
			return styles;
		},
		[size, isWall, isDoor, isWindow, schema, selected, mode],
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
					case GalleryBuilderModeEnum.Planimetry:
						if (!isRightMouse) {
							blockData.type = PlanimetryBlockTypeEnum.Wall;
							onChangeBlock(data.id, blockData);
							break;
						}
					// eslint-disable-next-line no-fallthrough
					case GalleryBuilderModeEnum.Erase:
						onChangeBlock(data.id, {
							id: data.id,
							type: PlanimetryBlockTypeEnum.Floor,
						});
						break;
					case GalleryBuilderModeEnum.Select:
						onSelect(data);
						break;
					case GalleryBuilderModeEnum.Spawn:
						onChangeSpawn(data.id);
						break;
					case GalleryBuilderModeEnum.Color:
						if (schema.isBlockColorable(data.id)) {
							blockData.color = isRightMouse ? null : color;
							blockData.texture = isRightMouse ? null : texture;
							onChangeBlock(data.id, blockData);
						}
						break;
				}
			}}
			onMouseEnter={() => {
				if (mouseDown) {
					switch (mode) {
						case GalleryBuilderModeEnum.Planimetry:
							if (!mouseRightDown) {
								blockData.type = PlanimetryBlockTypeEnum.Wall;
								onChangeBlock(data.id, blockData);
								break;
							}
						// eslint-disable-next-line no-fallthrough
						case GalleryBuilderModeEnum.Erase:
							onChangeBlock(data.id, {
								id: data.id,
								type: PlanimetryBlockTypeEnum.Floor,
							});
							break;
						case GalleryBuilderModeEnum.Color:
							if (schema.isBlockColorable(data.id)) {
								blockData.color = mouseRightDown ? null : color;
								blockData.texture = mouseRightDown ? null : texture;
								onChangeBlock(data.id, blockData);
							}
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
				fontSize="larger"
				justifyContent="center"
				alignItems="center"
				display="flex"
				visibility={isSpawn || isDoor || isWindow ? "visible" : "hidden"}>
				{isSpawn && (
					<IoAccessibilitySharp
						style={{
							display: "inline-block",
						}}
					/>
				)}
				{isDoor && (
					<TbDoor
						style={{
							display: "inline-block",
						}}
					/>
				)}
				{isWindow && (
					<TbWindow
						style={{
							display: "inline-block",
						}}
					/>
				)}
			</Box>
		</Box>
	);
}

export default memo(Block);
