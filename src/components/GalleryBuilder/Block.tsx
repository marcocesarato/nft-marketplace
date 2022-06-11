import {memo, MouseEvent, useMemo} from "react";
import {IoAccessibilitySharp} from "react-icons/io5";
import {TbDoor, TbWindow} from "react-icons/tb";
import {Box} from "@chakra-ui/react";

import {GalleryBuilderModeEnum, MapDirectionEnum, PlanimetryBlockTypeEnum} from "@app/enums";
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
	const iconStyle = {
		display: "inline-block",
	};
	const itemsCount = useMemo(() => {
		return Object.keys(data?.items || {}).filter((key: string) => data.items[key] !== null)
			.length;
	}, [data]);
	const blockStyle = useMemo(() => {
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
			backgroundColor: data.color,
			backgroundImage: data.texture?.image,
			backgroundSize: "cover",
			cursor: "pointer",
		};
		if (isWall || isDoor || isWindow) {
			styles.backgroundColor ||= defaultWallColor;
			const neightbours = schema.getNeighbors(data.id);
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
		if (schema.isMapBorderNorth(data.id)) {
			styles.borderTop = marginBorder;
		}
		if (schema.isMapBorderSouth(data.id)) {
			styles.borderBottom = marginBorder;
		}
		if (schema.isMapBorderWest(data.id)) {
			styles.borderLeft = marginBorder;
		}
		if (schema.isMapBorderEast(data.id)) {
			styles.borderRight = marginBorder;
		}
		if (selected?.id === data.id) {
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
	}, [size, isWall, isDoor, isWindow, schema, selected, mode, data]);
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
			{...blockStyle}>
			<Box
				as="span"
				backgroundColor="rgba(0,0,0,0.3)"
				color="rgba(255,255,255,0.9)"
				borderRadius="50%"
				height="100%"
				width="100%"
				fontSize="larger"
				justifyContent="center"
				alignItems="center"
				display="flex"
				visibility={isSpawn || isDoor || isWindow || itemsCount > 0 ? "visible" : "hidden"}>
				{isSpawn && <IoAccessibilitySharp style={iconStyle} />}
				{isDoor && <TbDoor style={iconStyle} />}
				{isWindow && <TbWindow style={iconStyle} />}
				{itemsCount > 0 && <span>{itemsCount}</span>}
			</Box>
		</Box>
	);
}

export default memo(Block);
