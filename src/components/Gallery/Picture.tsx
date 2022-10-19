import {useEffect, useRef, useState} from "react";
import {Image, Plane, Text} from "@belivvr/aframe-react";

import {MapDirection} from "@app/enums";
import {TokenItem} from "@app/types";
import {WallSize} from "@configs/gallery";
import useDebounceCallback from "@hooks/useDebounceCallback";

export const defaultPictureAttributes = {
	"height": WallSize,
	"width": WallSize,
	"shadow": {cast: true, receive: true},
	"physx-body": "type: static",
	"physx-restitution": "1.5",
};

type PictureProps = {
	src: string;
	id: string;
	data: TokenItem;
	ratio?: number;
	direction: MapDirection;
	position: {x: number; y: number; z: number};
	rotation: {x: number; y: number; z: number};
	[key: string]: any;
};

export default function Picture({
	src,
	data,
	id,
	ratio = 0.8,
	direction,
	position,
	rotation,
	...props
}: PictureProps): JSX.Element {
	const ref = useRef<HTMLElement>();
	const [openPanel, setOpenPanel] = useState(false);
	const toggleOpen = useDebounceCallback(() => {
		setOpenPanel(!openPanel);
	}, 250);
	useEffect(() => {
		const element = ref.current;
		element.addEventListener("click", toggleOpen);
		return () => {
			element.removeEventListener("click", toggleOpen);
		};
	}, [toggleOpen]);

	const picturePosition = {
		x: 0,
		y: 0,
		z: 0,
	};
	const panelPosition = {
		x: 0,
		y: 0,
		z: 0,
	};
	const threshold = 0.01;
	const wallSection = WallSize / 6;
	switch (direction) {
		case MapDirection.North:
			picturePosition.z = -wallSection - threshold;
			panelPosition.z = -wallSection - threshold * 2;
			break;
		case MapDirection.East:
			picturePosition.x = wallSection + threshold;
			panelPosition.x = wallSection + threshold * 2;
			break;
		case MapDirection.South:
			picturePosition.z = wallSection + threshold;
			panelPosition.z = wallSection + threshold * 2;
			break;
		case MapDirection.West:
		default:
			picturePosition.x = -wallSection - threshold;
			panelPosition.x = -wallSection - threshold * 2;
	}
	return (
		<a-entity ref={ref} position={Object.values(position).join(" ")}>
			<Image
				{...defaultPictureAttributes}
				src={src}
				position={picturePosition}
				rotation={rotation}
				height={WallSize * ratio}
				width={WallSize * ratio}
				{...props}
			/>
			{openPanel && (
				<Plane
					color="#000"
					position={panelPosition}
					rotation={rotation}
					height={WallSize * ratio}
					width={WallSize * ratio}>
					<Text
						value={data.name}
						height={WallSize * ratio}
						width={WallSize * ratio}
						align="center"
						position={{x: -0, y: 1, z: 0}}
					/>
					<Text
						value={data.token_address}
						height={WallSize * ratio}
						width={WallSize * ratio}
						align="center"
						position={{x: -0, y: -0, z: 0}}
					/>
				</Plane>
			)}
		</a-entity>
	);
}
