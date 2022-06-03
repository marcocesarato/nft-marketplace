/* eslint-disable @next/next/no-img-element */
import {useEffect} from "react";
import {AssetItem, Assets} from "@belivvr/aframe-react";

import {GalleryAssetTypesEnum, PlanimetryBlockTypeEnum} from "@app/enums";
import {GalleryAsset} from "@app/types";
import {MainCamera} from "@components/AFrame";
import {
	CameraHeight,
	defaultCeilingTexture,
	defaultFloorTexture,
	defaultWallTexture,
	WallHeight,
	WallSize,
} from "@configs/gallery";
import useGallery from "@contexts/Gallery";

import Ceiling from "./Ceiling";
import Floor from "./Floor";
import Wall from "./Wall";

export default function GalleryMap({planimetry}): JSX.Element {
	const {schema, setPlanimetry} = useGallery();
	const map = schema.getMap();

	const spawn = schema.getSpawn();
	const spawnX = spawn % map.width;
	const spawnY = Math.floor(spawn / map.width);
	const cameraPosition = {
		x: (spawnX - map.width / 2) * WallSize,
		y: CameraHeight,
		z: (spawnY - map.height / 2) * WallSize,
	};

	const spawnDirection = schema.getLongestBlockDirection(spawn);
	let cameraRotation = schema.getDirectionRotation(spawnDirection);

	useEffect(() => {
		if (planimetry) setPlanimetry(planimetry);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [planimetry]);

	// Load default assets
	const assets = new Map<String, GalleryAsset>();
	const defaultTextures = [defaultFloorTexture, defaultWallTexture, defaultCeilingTexture];
	defaultTextures.forEach((texture) => {
		texture.assets.forEach((asset) => {
			assets.set(asset.id, asset);
		});
	});

	// Blocks + assets
	const BlocksRender = [];
	map.blocks.forEach((block) => {
		const x = block.id % map.width;
		const y = Math.floor(block.id / map.width);
		let position = {x: 0, y: 0, z: 0};
		let navmesh = true;
		if (block.texture?.assets) {
			block.texture.assets.forEach((asset) => {
				if (!assets.has(asset.id)) {
					assets.set(asset.id, asset);
				}
			});
		}
		switch (block.type) {
			case PlanimetryBlockTypeEnum.Wall:
				navmesh = false;
				position = {
					x: (x - map.width / 2) * WallSize,
					y: WallHeight / 2,
					z: (y - map.height / 2) * WallSize,
				};
				const neighbors = schema.getNeighborsDetails(block.id);
				BlocksRender.push(
					<Wall
						key={"wall" + block.id}
						neighbors={neighbors}
						position={position}
						texture={block.texture}
						color={block.color}
					/>,
				);
				break;
			// eslint-disable-next-line no-fallthrough
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
						navmesh={navmesh}
						texture={block.texture}
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
	});
	const assetList = Array.from(assets.values());

	return (
		<>
			<Assets>
				{assetList.map((asset) => {
					switch (asset.type) {
						case GalleryAssetTypesEnum.Image:
							// eslint-disable-next-line jsx-a11y/alt-text
							return <img key={asset.id} id={asset.id} src={asset.src} />;
						case GalleryAssetTypesEnum.Item:
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
