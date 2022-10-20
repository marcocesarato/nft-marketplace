/* eslint-disable @next/next/no-img-element */
import {useEffect} from "react";
import {AssetItem, Assets} from "@belivvr/aframe-react";

import {
	GalleryAssetTypeEnum,
	getMapDirectionEnum,
	ObjectModelTypeEnum,
	PlanimetryBlockTypeEnum,
} from "@app/enums";
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
import {getEmbeddedIPFSImageUrl} from "@utils/url";

import Ceiling from "./Ceiling";
import Door from "./Door";
import Floor from "./Floor";
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

	const BlocksRender = [];
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
			case PlanimetryBlockTypeEnum.Door:
			case PlanimetryBlockTypeEnum.Wall:
			case PlanimetryBlockTypeEnum.Window:
				position = {
					x: (x - map.width / 2) * WallSize,
					y: WallHeight / 2,
					z: (y - map.height / 2) * WallSize,
				};
				const WallComponent =
					!isIncidenceSegment && !isColumn && isStraightSegment
						? block.type === PlanimetryBlockTypeEnum.Door
							? Door
							: block.type === PlanimetryBlockTypeEnum.Window
							? Window
							: Wall
						: Wall;

				BlocksRender.push(
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
			case PlanimetryBlockTypeEnum.Floor:
				if (!schema.isBlockInsideWalls(block.id)) return;
				position = {
					x: (x - map.width / 2) * WallSize,
					y: 0,
					z: (y - map.height / 2) * WallSize,
				};
				BlocksRender.push(
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
				BlocksRender.push(
					<Ceiling key={"ceilling" + block.id} position={position} navmesh={false} />,
				);

				break;
		}
		// Items
		if (!isColumn && !isIncidenceSegment) {
			Object.keys(block.items || {}).forEach(async (key) => {
				const item = block.items[key];
				if (!item) return;
				const direction = getMapDirectionEnum(key);
				const rotation = schema.getDirectionRotation(direction);
				const itemPosition = (position = {
					x: (x - map.width / 2) * WallSize,
					y: WallHeight / 2,
					z: (y - map.height / 2) * WallSize,
				});
				// Load item assets
				item.assets?.forEach(async (asset) => {
					if (!assets.has(asset.id)) {
						const src = getEmbeddedIPFSImageUrl(item.image);
						assets.set(asset.id, {...asset, src});
					}
				});
				switch (item.type) {
					case ObjectModelTypeEnum.Picture:
						const key = String("picture" + block.id + item.data?.token_id)
							.replace(/[^A-Za-z0-9]/g, "")
							.toLowerCase();
						BlocksRender.push(
							<Picture
								key={key}
								id={key}
								data={item.data}
								src={item.src}
								position={itemPosition}
								direction={direction}
								rotation={rotation}
							/>,
						);
						break;
					case ObjectModelTypeEnum.Object:
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
						case GalleryAssetTypeEnum.Image:
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
						case GalleryAssetTypeEnum.Item:
							return <AssetItem key={asset.id} id={asset.id} src={asset.src} />;
						default:
							return null;
					}
				})}
			</Assets>
			{/* Blocks */}
			{BlocksRender}
			{/* Camera */}
			<MainCamera
				userHeight={CameraHeight}
				position={cameraPosition}
				rotation={cameraRotation}
			/>
		</>
	);
}
