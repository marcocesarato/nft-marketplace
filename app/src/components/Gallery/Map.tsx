/* eslint-disable @next/next/no-img-element */
import {useEffect} from "react";
import {AssetItem, Assets, Video} from "@belivvr/aframe-react";

import {GalleryAssetType, getMapDirection, ObjectModelType, PlanimetryBlockType} from "@app/enums";
import {GalleryAsset, TextureAsset} from "@app/types";
import {MainCamera} from "@components/AFrame";
import {
	CameraHeight,
	DefaultCeilingTexture,
	DefaultFloorTexture,
	DefaultWallTexture,
	Textures,
	WallHeight,
	WallSize,
} from "@configs/gallery";
import useGallery from "@contexts/Gallery";
import {slug} from "@utils/formatters";

import Ceiling from "./Ceiling";
import Door from "./Door";
import Floor from "./Floor";
import Model from "./Model";
import Picture from "./Picture";
import Wall from "./Wall";
import Window from "./Window";

export default function GalleryMap({planimetry}): JSX.Element {
	const {schema, setSchema} = useGallery();
	const map = schema.getMap();

	const spawn = schema.getSpawn();
	const spawnX = spawn % map.width;
	const spawnY = Math.floor(spawn / map.width);
	const cameraPosition = {
		x: (spawnX - map.width / 2) * WallSize,
		y: CameraHeight,
		z: (spawnY - map.height / 2) * WallSize,
	};

	const spawnDirection = schema.getLongestConnectedBlocksDirection(spawn);
	const cameraRotation = schema.getDirectionRotation(spawnDirection);

	// Load default assets
	const assets = new Map<String, GalleryAsset>();
	const defaultTextures = [DefaultFloorTexture, DefaultWallTexture, DefaultCeilingTexture];
	defaultTextures.forEach((texture) => {
		texture.assets.forEach((asset) => {
			assets.set(asset.id, asset);
		});
	});

	const blocks = [];
	map.blocks.forEach((block) => {
		const x = block.id % map.width;
		const y = Math.floor(block.id / map.width);
		let position = {x: 0, y: 0, z: 0};
		let textureData: TextureAsset;
		if (block.texture && Object.prototype.hasOwnProperty.call(Textures, block.texture)) {
			textureData = Textures[block.texture];
			// Load assets
			textureData?.assets?.forEach((asset) => {
				if (!assets.has(asset.id)) {
					assets.set(asset.id, asset);
				}
			});
		}
		const neighbors = schema.getNeighbors(block.id);
		const isColumn = schema.isColumn(block.id);
		const isIncidenceSegment = schema.isIncidenceSegment(block.id);
		const isStraightSegment = schema.isStraightSegment(block.id);
		// Block render
		switch (block.type) {
			case PlanimetryBlockType.Door:
			case PlanimetryBlockType.Wall:
			case PlanimetryBlockType.Window:
				position = {
					x: (x - map.width / 2) * WallSize,
					y: WallHeight / 2,
					z: (y - map.height / 2) * WallSize,
				};
				const WallComponent =
					!isIncidenceSegment && !isColumn && isStraightSegment
						? block.type === PlanimetryBlockType.Door
							? Door
							: block.type === PlanimetryBlockType.Window
							? Window
							: Wall
						: Wall;

				blocks.push(
					<WallComponent
						key={"wall" + block.id}
						neighbors={neighbors}
						position={position}
						isColumn={isColumn}
						isIncidence={isIncidenceSegment}
						texture={textureData}
						color={block.color}
					/>,
				);
				break;
			case PlanimetryBlockType.Floor:
				if (!schema.isBlockInsideWalls(block.id)) return;
				position = {
					x: (x - map.width / 2) * WallSize,
					y: 0,
					z: (y - map.height / 2) * WallSize,
				};
				blocks.push(
					<Floor
						key={"floor" + block.id}
						position={position}
						navmesh={true}
						texture={textureData}
						color={block.color}
					/>,
				);
				position = {
					x: (x - map.width / 2) * WallSize,
					y: WallHeight,
					z: (y - map.height / 2) * WallSize,
				};
				blocks.push(
					<Ceiling key={"ceilling" + block.id} position={position} navmesh={false} />,
				);

				break;
		}
		// Items
		if ((!isColumn && !isIncidenceSegment) || block.type === PlanimetryBlockType.Floor) {
			Object.keys(block.items || {}).forEach(async (key) => {
				const item = block.items[key];
				if (!item) return;
				const direction = getMapDirection(key);
				const rotation = schema.getDirectionRotation(direction);
				const itemKey = slug("picture" + block.id + item.data?.token_id);
				switch (item.type) {
					case ObjectModelType.Picture:
						const itemPosition = (position = {
							x: (x - map.width / 2) * WallSize,
							y: WallHeight / 2,
							z: (y - map.height / 2) * WallSize,
						});
						blocks.push(
							<Picture
								key={itemKey}
								id={key}
								sold={item.sold}
								data={item.data}
								src={item.src}
								position={itemPosition}
								direction={direction}
								rotation={rotation}
							/>,
						);
						break;
					case ObjectModelType.Object:
						const modelPosition = (position = {
							x: (x - map.width / 2) * WallSize,
							y: 0,
							z: (y - map.height / 2) * WallSize,
						});
						blocks.push(
							<Model
								key={itemKey}
								id={key}
								sold={item.sold}
								data={item.data}
								src={item.src}
								position={modelPosition}
								direction={direction}
								rotation={rotation}
							/>,
						);
						break;
				}
			});
		}
	});

	const assetList = Array.from(assets.values());

	useEffect(() => {
		if (planimetry && Object.keys(planimetry).length > 0) setSchema(planimetry);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [planimetry]);

	return (
		<>
			<Assets>
				{assetList.map((asset) => {
					switch (asset.type) {
						case GalleryAssetType.Image:
							// eslint-disable-next-line jsx-a11y/alt-text
							return (
								<img
									key={asset.id}
									id={asset.id}
									src={asset.src}
									alt={asset.id}
									crossOrigin="anonymous"
								/>
							);
						case GalleryAssetType.Item:
							return <AssetItem key={asset.id} id={asset.id} src={asset.src} />;
						case GalleryAssetType.Video:
							return <Video key={asset.id} id={asset.id} src={asset.src} />;
						default:
							return null;
					}
				})}
			</Assets>
			{/* Blocks */}
			{blocks}
			{/* Camera */}
			<MainCamera
				userHeight={CameraHeight}
				position={cameraPosition}
				rotation={cameraRotation}
			/>
		</>
	);
}
