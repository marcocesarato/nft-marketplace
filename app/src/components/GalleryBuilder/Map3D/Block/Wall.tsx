import {useMemo} from "react";
import {useLoader} from "@react-three/fiber";
import {TextureLoader, Vector3} from "three";

import {DefaultColor, DefaultWallTexture, Textures} from "@configs/gallery";
import useGallery from "@contexts/Gallery";

import Floor from "./Floor";
import Items from "./Items";
import Wireframe from "./Wireframe";

export default function MapWall(props) {
	const {schema, selected} = useGallery();
	const {blockId, row, column} = props;
	const data = useMemo(() => schema.getBlock(blockId), [blockId, schema]);
	const position = useMemo(() => new Vector3(column + 0.5, 0.5, row + 0.5), [row, column]) as any;
	const isColumn = schema.isColumn(blockId);
	const isSelected = useMemo(() => selected?.id === data.id, [data?.id, selected]);
	const texture =
		data.texture && Object.prototype.hasOwnProperty.call(Textures, data.texture)
			? Textures[data.texture]
			: DefaultWallTexture;
	const textureMap = useLoader(TextureLoader, texture.image) as any;
	const hasItems = Object.values(data.items || {}).filter(Boolean).length > 0;

	let mesh = (
		<mesh position={position} rotation-x={-Math.PI / 2} receiveShadow castShadow>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial
				roughness={1}
				transparent
				opacity={0.9}
				color={data?.color ?? DefaultColor}
				map={textureMap}
			/>
		</mesh>
	);

	if (isColumn) {
		mesh = (
			<>
				<mesh position={position} receiveShadow castShadow>
					<cylinderGeometry args={[0.5, 0.5, 1]} />
					<meshStandardMaterial
						roughness={1}
						transparent
						opacity={0.9}
						color={data?.color ?? DefaultColor}
						map={textureMap}
					/>
				</mesh>
				<Floor {...props} />
			</>
		);
	}

	return (
		<>
			{mesh}
			{hasItems && <Items column={column} row={row} />}
			{isSelected && <Wireframe column={column} row={row} />}
		</>
	);
}
