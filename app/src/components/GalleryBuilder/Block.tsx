import {CSSProperties, MouseEvent, useCallback, useMemo} from "react";
import {IoAccessibilitySharp} from "react-icons/io5";
import {TbDoor, TbWindow} from "react-icons/tb";
import {Box} from "@chakra-ui/react";

import {GalleryBuilderMode, MapDirection, PlanimetryBlockType} from "@app/enums";
import {Textures} from "@configs/gallery";
import useGallery from "@contexts/Gallery";
import {clone} from "@utils/converters";

const iconStyle = {
	display: "inline-block",
	position: "absolute",
	margin: "auto",
	top: "50%",
	transform: "translateY(-50%)",
} as CSSProperties;

function Block({item, size}): JSX.Element {
	const {
		schema,
		mode,
		selected,
		color,
		texture,
		mouseDown,
		mouseRightDown,
		onSelect,
		onChangeSpawn,
		onChangeBlock,
		onMouseDown,
		onMouseRightDown,
	} = useGallery();
	const data = useMemo(() => schema.getBlock(item), [item, schema]);
	const blockData = useMemo(() => clone(data), [data]);
	const itemsCount = useMemo(() => {
		return Object.keys(data?.items || {}).filter((key: string) => data.items[key] !== null)
			.length;
	}, [data]);
	const isSpawn = useMemo(() => data?.id === schema.getSpawn(), [data?.id, schema]);
	const isDoor = useMemo(() => data?.type === PlanimetryBlockType.Door, [data?.type]);
	const isWindow = useMemo(() => data?.type === PlanimetryBlockType.Window, [data?.type]);
	const isWall = useMemo(() => data?.type === PlanimetryBlockType.Wall, [data?.type]);
	const blockStyle = useMemo(() => {
		const blockSize = `${size}px`;
		const defaultWallColor = "#cbd5e0";
		const defaultBorder = "1px dashed #cbd5e0";
		const defaultMarginBorder = "3px solid #cbd5e0";
		const texture =
			data.texture && Object.prototype.hasOwnProperty.call(Textures, data.texture)
				? Textures[data.texture]
				: null;
		const selectedBorder = "3px dashed #00bfff";
		const wallBorder = "3px solid black";
		const styles = {
			width: blockSize,
			height: blockSize,
			padding: 2,
			borderTop: defaultBorder,
			borderBottom: defaultBorder,
			borderLeft: defaultBorder,
			borderRight: defaultBorder,
			backgroundColor: data.color,
			backgroundImage: texture?.image,
			backgroundSize: "cover",
			cursor: "pointer",
		};
		if (isWall || isDoor || isWindow) {
			styles.backgroundColor ||= defaultWallColor;
			const neightbours = schema.getNeighbors(data.id);
			neightbours.forEach((neightbour) => {
				if (
					neightbour.type !== PlanimetryBlockType.Wall &&
					neightbour.type !== PlanimetryBlockType.Door &&
					neightbour.type !== PlanimetryBlockType.Window
				) {
					switch (neightbour.direction) {
						case MapDirection.North:
							styles.borderTop = wallBorder;
							break;
						case MapDirection.South:
							styles.borderBottom = wallBorder;
							break;
						case MapDirection.East:
							styles.borderRight = wallBorder;
							break;
						case MapDirection.West:
							styles.borderLeft = wallBorder;
							break;
					}
				} else {
					switch (neightbour.direction) {
						case MapDirection.North:
							styles.borderTop = "none";
							break;
						case MapDirection.South:
							styles.borderBottom = "none";
							break;
						case MapDirection.East:
							styles.borderRight = "none";
							break;
						case MapDirection.West:
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
			mode === GalleryBuilderMode.Planimetry ||
			mode === GalleryBuilderMode.Erase ||
			mode === GalleryBuilderMode.Color
		) {
			styles.cursor = "crosshair";
		}
		return styles;
	}, [
		size,
		data.texture,
		data.color,
		data.id,
		isWall,
		isDoor,
		isWindow,
		schema,
		selected?.id,
		mode,
	]);

	const handleMouseDown = useCallback(
		(e: MouseEvent) => {
			let isRightMouse = false;
			onMouseDown(true);
			if (e.button === 2) {
				isRightMouse = true;
				onMouseRightDown(true);
			}
			let wallType: PlanimetryBlockType;
			switch (mode) {
				case GalleryBuilderMode.Doors:
					wallType = PlanimetryBlockType.Door;
				// eslint-disable-next-line no-fallthrough
				case GalleryBuilderMode.Windows:
					if (!wallType) {
						wallType = PlanimetryBlockType.Window;
					}
					if (itemsCount > 0) break;
					if (isRightMouse) {
						blockData.type = PlanimetryBlockType.Wall;
						onChangeBlock(data.id, blockData);
						break;
					}
				// eslint-disable-next-line no-fallthrough
				case GalleryBuilderMode.Planimetry:
					if (!isRightMouse) {
						blockData.type = wallType ?? PlanimetryBlockType.Wall;
						onChangeBlock(data.id, blockData);
						break;
					}
				// eslint-disable-next-line no-fallthrough
				case GalleryBuilderMode.Erase:
					onChangeBlock(data.id, {
						id: data.id,
						type: PlanimetryBlockType.Floor,
					});
					break;
				case GalleryBuilderMode.Select:
					onSelect(data);
					break;
				case GalleryBuilderMode.Spawn:
					onChangeSpawn(data.id);
					break;
				case GalleryBuilderMode.Color:
					if (schema.isBlockColorable(data.id)) {
						blockData.color = isRightMouse ? null : color;
						blockData.texture = isRightMouse ? null : texture?.name;
						onChangeBlock(data.id, blockData);
					}
					break;
			}
		},
		[
			itemsCount,
			blockData,
			color,
			data,
			mode,
			onChangeBlock,
			onChangeSpawn,
			onMouseDown,
			onMouseRightDown,
			onSelect,
			schema,
			texture?.name,
		],
	);

	const handleMouseEnter = useCallback(() => {
		if (mouseDown) {
			switch (mode) {
				case GalleryBuilderMode.Planimetry:
					if (!mouseRightDown) {
						blockData.type = PlanimetryBlockType.Wall;
						onChangeBlock(data.id, blockData);
						break;
					}
				// eslint-disable-next-line no-fallthrough
				case GalleryBuilderMode.Erase:
					onChangeBlock(data.id, {
						id: data.id,
						type: PlanimetryBlockType.Floor,
					});
					break;
				case GalleryBuilderMode.Color:
					if (schema.isBlockColorable(data.id)) {
						blockData.color = mouseRightDown ? null : color;
						blockData.texture = mouseRightDown ? null : texture?.name;
						onChangeBlock(data.id, blockData);
					}
					break;
			}
		}
	}, [
		blockData,
		color,
		data.id,
		mode,
		mouseDown,
		mouseRightDown,
		onChangeBlock,
		schema,
		texture?.name,
	]);

	const handleMouseUp = useCallback(() => {
		onMouseDown(false);
		onMouseRightDown(false);
	}, [onMouseDown, onMouseRightDown]);

	return (
		<Box
			as={"td"}
			userSelect="none"
			onContextMenu={(e) => e.preventDefault()}
			onMouseDown={handleMouseDown}
			onMouseEnter={handleMouseEnter}
			onMouseUp={handleMouseUp}
			{...blockStyle}>
			<Box
				as="span"
				backgroundColor="rgba(0,0,0,0.3)"
				color="rgba(255,255,255,0.9)"
				borderRadius="50%"
				position="relative"
				width="100%"
				height="0"
				paddingTop="100%"
				fontSize="larger"
				justifyContent="center"
				alignItems="center"
				display="flex"
				visibility={isSpawn || isDoor || isWindow || itemsCount > 0 ? "visible" : "hidden"}>
				{isSpawn && <IoAccessibilitySharp style={iconStyle} />}
				{isDoor && <TbDoor style={iconStyle} />}
				{isWindow && <TbWindow style={iconStyle} />}
				{itemsCount > 0 && (
					<Box as="span" style={iconStyle}>
						{itemsCount}
					</Box>
				)}
			</Box>
		</Box>
	);
}

export default Block;
