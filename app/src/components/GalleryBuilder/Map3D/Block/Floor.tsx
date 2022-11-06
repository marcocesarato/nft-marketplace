import {useMemo} from "react";
import {useLoader} from "@react-three/fiber";
import {TextureLoader, Vector3} from "three";

import {DefaultColor, DefaultFloorTexture, Textures} from "@configs/gallery";
import useGallery from "@contexts/Gallery";

import Items from "./Items";
import Spawn from "./Spawn";
import Wireframe from "./Wireframe";

export default function MapFloor({blockId, row, column}) {
	const {schema, selected} = useGallery();
	const data = useMemo(() => schema.getBlock(blockId), [blockId, schema]);
	const position = useMemo(() => new Vector3(column + 0.5, 0, row + 0.5), [row, column]) as any;
	const isSpawn = useMemo(() => data?.id === schema.getSpawn(), [data?.id, schema]);
	const isSelected = useMemo(() => selected?.id === data.id, [data?.id, selected]);
	const texture =
		data.texture && Object.prototype.hasOwnProperty.call(Textures, data.texture)
			? Textures[data.texture]
			: DefaultFloorTexture;
	const textureMap = useLoader(TextureLoader, texture.image) as any;
	const hasItems = Object.values(data.items || {}).filter(Boolean).length > 0;

	return (
		<>
			<mesh position={position} rotation-x={-Math.PI / 2} receiveShadow>
				<planeGeometry args={[1, 1, 1]} />
				<meshStandardMaterial
					roughness={0.2}
					color={data?.color ?? DefaultColor}
					map={textureMap}
				/>
			</mesh>
			{hasItems && <Items column={column} row={row} isFloor={true} />}
			{isSpawn && <Spawn column={column} row={row} />}
			{isSelected && <Wireframe column={column} row={row} />}
		</>
	);
}
