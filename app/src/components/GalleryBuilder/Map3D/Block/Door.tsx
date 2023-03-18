import {useMemo} from "react";
import {useLoader} from "@react-three/fiber";
import {TextureLoader, Vector3} from "three";

import {DefaultColor, DefaultWallTexture, Textures} from "@configs/gallery";
import useGallery from "@contexts/Gallery";

import Floor from "./Floor";
import Wireframe from "./Wireframe";

export default function MapDoor(props) {
	const {blockId, row, column} = props;
	const {schema, selected} = useGallery();
	const data = useMemo(() => schema.getBlock(blockId), [blockId, schema]);
	const position = useMemo(() => new Vector3(column + 0.5, 0.9, row + 0.5), [row, column]) as any;
	const isSelected = useMemo(() => selected?.id === data.id, [data?.id, selected]);
	const texture =
		data.texture && Object.prototype.hasOwnProperty.call(Textures, data.texture)
			? Textures[data.texture]
			: DefaultWallTexture;
	const textureMap = useLoader(TextureLoader as any, texture.image) as any;

	return (
		<>
			<mesh position={position} rotation-x={-Math.PI / 2} receiveShadow castShadow>
				<boxGeometry args={[1, 1, 0.2]} />
				<meshStandardMaterial
					roughness={1}
					transparent
					opacity={0.9}
					color={data?.color ?? DefaultColor}
					map={textureMap}
				/>
			</mesh>
			<Floor {...props} />
			{isSelected && <Wireframe column={column} row={row} />}
		</>
	);
}
