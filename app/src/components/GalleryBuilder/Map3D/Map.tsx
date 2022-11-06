import {useCallback, useMemo, useRef, useState} from "react";
import {OrbitControls} from "@react-three/drei";
import {Vector3} from "three";
import {DoubleSide} from "three/src/constants";

import {GalleryBuilderModeEnum, PlanimetryBlockType, PlanimetryBlockTypeEnum} from "@app/enums";
import useGallery from "@contexts/Gallery";
import {clone} from "@utils/converters";

import Block from "./Block";
import Ground from "./Ground";

function Map(): JSX.Element {
	const highlightRef = useRef<any>(null!);
	const {schema, mode, color, texture, onSelect, onChangeSpawn, onChangeBlock} = useGallery();
	const planimetry = schema.getMap();
	const mapHeight = useMemo(() => planimetry.height, [planimetry.height]);
	const mapWidth = useMemo(() => planimetry.width, [planimetry.width]);

	const blocks = useMemo(() => {
		return Array.from(Array(mapHeight).keys()).map((column) => (
			<>
				{Array.from(Array(mapWidth).keys()).map((row) => {
					const id = column + row * mapWidth;
					return (
						<Block key={`gallery-cell-${id}`} blockId={id} row={row} column={column} />
					);
				})}
			</>
		));
	}, [mapHeight, mapWidth]);

	const [isDragging, setIsDragging] = useState(false);

	const onClick = useCallback(
		(e) => {
			setTimeout(() => {
				const highlightMesh = highlightRef.current;
				const highlightPos = new Vector3().copy(e.point).floor().addScalar(0.5);
				highlightMesh.position.set(highlightPos.x, 0.01, highlightPos.z);
				const blockId = highlightPos.x - 0.5 + (highlightPos.z - 0.5) * mapWidth;
				const data = schema.getBlock(blockId);
				const blockData = clone(data);
				const itemsCount = Object.keys(data?.items || {}).filter(
					(key: string) => data.items[key] !== null,
				).length;
				let wallType: PlanimetryBlockType;
				switch (mode) {
					case GalleryBuilderModeEnum.Doors:
						wallType = PlanimetryBlockTypeEnum.Door;
					// eslint-disable-next-line no-fallthrough
					case GalleryBuilderModeEnum.Windows:
						if (!wallType) {
							wallType = PlanimetryBlockTypeEnum.Window;
						}
						if (itemsCount > 0) break;
					// eslint-disable-next-line no-fallthrough
					case GalleryBuilderModeEnum.Planimetry:
						blockData.type = wallType ?? PlanimetryBlockTypeEnum.Wall;
						onChangeBlock(data.id, blockData);
						break;
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
							blockData.color = color;
							blockData.texture = texture?.name;
							onChangeBlock(data.id, blockData);
						}
						break;
				}
			}, 20);
		},
		[color, mapWidth, mode, onChangeBlock, onChangeSpawn, onSelect, schema, texture?.name],
	);

	const onMove = useCallback(
		(e) => {
			const highlightMesh = highlightRef.current;
			const highlightPos = new Vector3().copy(e.point).floor().addScalar(0.5);
			highlightMesh.position.set(highlightPos.x, 0.01, highlightPos.z);
			highlightMesh.material.color.setHex(0x0000ff);

			if (isDragging) {
				onClick(e);
			}
		},
		[isDragging, onClick],
	);
	return (
		<>
			<OrbitControls
				target={[mapWidth / 2, 0, mapHeight / 2]}
				minPolarAngle={0}
				maxPolarAngle={Math.PI / 2.1}
				enabled={!isDragging}
			/>
			{blocks}
			<Ground
				width={mapWidth}
				height={mapHeight}
				onClick={onClick}
				onMove={onMove}
				setIsDragging={setIsDragging}
			/>
			<mesh
				ref={highlightRef}
				position={[0.5, 0.01, 0.5]}
				rotation-x={-Math.PI / 2}
				receiveShadow={true}>
				<planeGeometry args={[1, 1]} />
				<meshBasicMaterial side={DoubleSide} transparent={true} />
			</mesh>
			<gridHelper
				position={[mapHeight / 2, 0.01, mapHeight / 2]}
				args={[mapWidth, mapHeight]}
			/>
		</>
	);
}

export default Map;
